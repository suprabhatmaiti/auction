import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
export function socketAuth(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      const decoded = verifyAccessToken(token);
      if (!decoded) {
        return next(new Error("Invalid Token"));
      }
      socket.user = decoded;
      return next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Unauthorized"));
    }
  });
}
