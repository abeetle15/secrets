import jwt from "jsonwebtoken";
import config from "../config/environment.js";

export function validateJwt(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Bearer token is required for protected routes" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error,
    });
  }
}
