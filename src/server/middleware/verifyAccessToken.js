import jwt from "jsonwebtoken";

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Token Verification Error:", error);
    return null;
  }
}
