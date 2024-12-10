import express from "express";
import config from "./config/environment.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/errorHandling.js";
import { limiter, speedLimiter } from "./middlewares/limiter.js";
import cors from "cors";
import helmet from "helmet";
import swaggerSetup from "./config/swaggerSetup.js";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
swaggerSetup(app);

app.use(limiter);
app.use(speedLimiter);
app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorMiddleware);

export default app;
