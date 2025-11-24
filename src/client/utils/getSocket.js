import { io } from "socket.io-client";
import { getAccessToken } from "./api.js";

let socket = null;

export function getSocket() {
  // if (socket) return socket;
  const token = getAccessToken();
  socket = io("http://localhost:3000", {
    autoConnect: false,
    withCredentials: true,
    auth: { token: token },
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err?.message);
  });

  return socket;
}
