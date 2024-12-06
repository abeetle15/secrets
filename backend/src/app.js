import express from "express";
import config from "./config/environment.js";
import routes from "./routes/index.js";
import cors from "cors";
import helmet from "helmet";
import swaggerSetup from "./config/swaggerSetup.js";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
swaggerSetup(app);

app.use("/api", routes);

export default app;
