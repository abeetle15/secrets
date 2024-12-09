import express from "express";
import {
  postSecret,
  getAllSecrets,
  deleteSecret,
} from "../controllers/secretControllers.js";
import { validateJwt } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post("/", validateJwt, postSecret);
router.get("/", validateJwt, getAllSecrets);
router.delete("/:id", validateJwt, deleteSecret);

export default router;
