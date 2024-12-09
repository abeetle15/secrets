import express from "express";
import { validateJwt } from "../middlewares/jwtMiddleware.js";
import { createLike } from "../controllers/likeControllers.js";

const router = express.Router();

router.post("/:secretId", validateJwt, createLike);

export default router;
