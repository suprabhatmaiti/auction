import { jwtDecode } from "jwt-decode";
import { useState, useEffect, createContext, useContext } from "react";
import api, { setAccessToken } from "../utils/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const decodeAndSetUser = (token) => {
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setUser(decoded);
    } catch (error) {
      // console.log("Error decoding token:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        const { data } = await api.post("/api/auth/refresh-token");
        if (!mounted) return;
        setAccessToken(data.accessToken);
        decodeAndSetUser(data.accessToken);
      } catch (error) {
        // console.log("Error refreshing token:", error);
        setUser(null);
        setAccessToken(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
  }, []);

  const register = async (payload) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/register", payload);
      const { accessToken, user } = response.data;
      decodeAndSetUser(accessToken);
      setAccessToken(accessToken);
      setLoading(false);
      return { accessToken, user };
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/login", payload);
      const { accessToken, user } = response.data;
      decodeAndSetUser(accessToken);
      setAccessToken(accessToken);
      setLoading(false);
      return { accessToken, user };
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/logout", null, { withCredentials: true });
      setLoading(false);
    } catch (error) {
    } finally {
      setUser(null);
      setAccessToken(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        register,
        login,
        logout,
        loading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
