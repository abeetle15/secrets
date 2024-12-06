import app from "./app.js";
import config from "./config/environment.js";
import connectDb from "./config/dbSetup.js";

connectDb()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on Port: ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error: ", error);
    process.exit(1);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); //
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Graceful shutdown on termination signals
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});
