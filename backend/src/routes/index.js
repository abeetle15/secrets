import express from "express";
import authRoutes from "./authRoutes.js";
import secretRoutes from "./secretRoutes.js";
import likeRoutes from "./likeRoutes.js";
import commentRoutes from "./commentRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/secrets", secretRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);
router.use("/user", userRoutes);

export default router;
