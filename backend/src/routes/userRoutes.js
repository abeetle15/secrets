import express from "express";
import {
  getUserInfo,
  getUsersSecrets,
  updateUserInfo,
} from "../controllers/userControllers.js";
import { validateJwt } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.get("/:userId", validateJwt, getUserInfo);
router.get("/secrets/:userId", validateJwt, getUsersSecrets);
router.patch("/:userId", validateJwt, updateUserInfo);

export default router;
