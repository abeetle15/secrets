import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

// Limit each IP to 200 requests per 15 minutes
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // Allow 100 requests per 15 minutes before slowing down
  delayMs: () => 500, // Add 500ms delay per request above the limit
});
