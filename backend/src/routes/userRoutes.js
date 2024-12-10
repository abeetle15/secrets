import express from "express";
import {
  getUserInfo,
  getUsersSecrets,
  updateUserInfo,
  followOtherUser,
  unfollowOtherUser,
  getUserLikes,
} from "../controllers/userControllers.js";
import { validateJwt } from "../middlewares/jwtMiddleware.js";

const router = express.Router();

router.get("/:userId", validateJwt, getUserInfo);
router.get("/secrets/:userId", validateJwt, getUsersSecrets);
router.patch("/:userId", validateJwt, updateUserInfo);
router.put("/:userToFollowId/follow", validateJwt, followOtherUser);
router.put("/:userToUnfollowId/unfollow", validateJwt, unfollowOtherUser);
router.get("/likes/:userId", validateJwt, getUserLikes);

export default router;
