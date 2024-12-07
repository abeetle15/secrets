import express from "express";
import { postSecret, getAllSecrets } from "../controllers/secretControllers.js";
import { validateJwt } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post("/", validateJwt, postSecret);
router.get("/", validateJwt, getAllSecrets);

export default router;
