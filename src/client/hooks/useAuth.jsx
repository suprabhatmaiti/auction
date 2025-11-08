import { jwtDecode } from "jwt-decode";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from "react";
import api, { setAccessToken } from "../utils/api.js"; // axios instance; refresh uses cookies

const AuthContext = createContext();

const decodeToken = (token) => {
  if (!token) return null;
  try {
    return jwtDecode(token); // { exp, iat, id, name, email, role, created_at? ... }
  } catch {
    return null;
  }
};

const buildUser = (decoded, userFromAPI) => {
  // Prefer server-provided fields when available; fall back to token claims.
  if (userFromAPI) return userFromAPI;
  if (!decoded) return null;
  return {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role,
    created_at: decoded.created_at, // may be undefined if not included in JWT
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // keep the access token purely in memory (module + axios header via setAccessToken)
  const accessTokenRef = useRef(null);
  const refreshTimerRef = useRef(null);

  const clearRefreshTimer = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  };

  const scheduleRefresh = useCallback((token) => {
    clearRefreshTimer();
    const decoded = decodeToken(token);
    if (!decoded?.exp) return; // nothing to schedule

    const expMs = decoded.exp * 1000;
    const now = Date.now();

    // refresh 45s before expiry (min 2s from now)
    const bufferMs = 45_000;
    const delay = Math.max(expMs - now - bufferMs, 2_000);

    refreshTimerRef.current = setTimeout(() => {
      void doRefresh(); // fire and forget; errors handled inside
    }, delay);
  }, []);

  const setSession = useCallback(
    (token, userFromAPI = null) => {
      accessTokenRef.current = token || null;
      setAccessToken(token || null); // updates axios default Authorization header

      const decoded = decodeToken(token);
      const built = buildUser(decoded, userFromAPI);

      if (token && decoded) {
        setUser(built);
        scheduleRefresh(token);
      } else {
        setUser(null);
        clearRefreshTimer();
      }
    },
    [scheduleRefresh]
  );

  const doRefresh = useCallback(async () => {
    try {
      // Your backend issues a new access token using the refresh cookie
      const { data } = await api.post("/api/auth/refresh-token", null, {
        withCredentials: true, // important for cookies
      });
      setSession(data.accessToken);
      return true;
    } catch (err) {
      // refresh failed → logout locally
      setSession(null);
      return false;
    }
  }, [setSession]);

  // Bootstrap on mount: try to refresh once (silent login)
  useEffect(() => {
    void doRefresh();
    // clean up timer on unmount
    return () => clearRefreshTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh when tab becomes visible (helps if app was idle/asleep)
  useEffect(() => {
    const onVisible = async () => {
      if (document.visibilityState !== "visible") return;

      const token = accessTokenRef.current;
      const decoded = decodeToken(token);
      const nowSec = Date.now() / 1000;

      // If no token or exp is close/expired, refresh.
      if (!decoded?.exp || decoded.exp - nowSec < 60) {
        await doRefresh();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [doRefresh]);

  // Public API
  const register = useCallback(
    async (payload) => {
      const { data } = await api.post("/api/auth/register", payload, {
        withCredentials: true,
      });
      const { accessToken, user: userFromAPI } = data;
      setSession(accessToken, userFromAPI);
      return data;
    },
    [setSession]
  );

  const login = useCallback(
    async (payload) => {
      const { data } = await api.post("/api/auth/login", payload, {
        withCredentials: true,
      });
      const { accessToken, user: userFromAPI } = data;
      setSession(accessToken, userFromAPI);
      return data;
    },
    [setSession]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout", null, { withCredentials: true });
    } catch {
      // ignore
    } finally {
      setSession(null);
    }
  }, [setSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;
