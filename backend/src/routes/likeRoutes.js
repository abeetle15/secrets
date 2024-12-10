import express from "express";
import { validateJwt } from "../middlewares/jwtMiddleware.js";
import { createLike, removeLike } from "../controllers/likeControllers.js";

const router = express.Router();

router.post("/:secretId", validateJwt, createLike);
router.delete("/:secretId", validateJwt, removeLike);

export default router;
