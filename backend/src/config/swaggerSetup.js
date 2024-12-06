import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";

const swaggerDoc = yaml.parse(
  fs.readFileSync(
    "/Users/UnCucarron/Documents/my-projects/secrets/backend/src/docs/swagger.yaml",
    "utf8"
  )
);

export default function swaggerSetup(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
