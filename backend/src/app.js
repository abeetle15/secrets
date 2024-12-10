import express from "express";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorHandling.js";
import { limiter, speedLimiter } from "./middlewares/limiter.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";

const app = express();
// input formats
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
// safety
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xssClean());
app.use(limiter);
app.use(speedLimiter);
// docs
const swaggerDoc = yaml.parse(
  fs.readFileSync(
    "/Users/UnCucarron/Documents/my-projects/secrets/backend/src/docs/swagger.yaml",
    "utf8"
  )
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// routes
app.use("/api", routes);
// errors
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});
app.use(errorMiddleware);

export default app;
