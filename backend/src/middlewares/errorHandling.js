export default function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[${new Date().toISOString()}] ${message}:`, err.stack);

  res.status(status).json({
    message,
    error: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}
