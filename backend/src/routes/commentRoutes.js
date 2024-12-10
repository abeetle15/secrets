import express from "express";
import {
  addComment,
  removeComment,
  getCommentsForPost,
} from "../controllers/commentControllers.js";
import { validateJwt } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.post("/:secretId", validateJwt, addComment);
router.get("/:secretId", validateJwt, getCommentsForPost);
router.delete("/:commentId", validateJwt, removeComment);

export default router;
