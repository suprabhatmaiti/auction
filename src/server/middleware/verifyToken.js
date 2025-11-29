import { verifyAccessToken } from "./verifyAccessToken.js";

export const verifyToken = (req, res, next) => {
  try {
    const reqHeader = req.headers.authorization;

    if (!reqHeader) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = reqHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: malformed token" });
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};
