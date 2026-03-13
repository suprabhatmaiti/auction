import { createContext, useContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import { getAccessToken } from "../utils/api";
import useAuth from "../hooks/useAuth";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const token = getAccessToken();

  const socket = useMemo(() => {
    return io(import.meta.env.VITE_API_BASE_URL, {
      autoConnect: false,
      withCredentials: true,
      auth: { token },
    });
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, [isLoggedIn, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default useSocket;
