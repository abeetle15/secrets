import express from "express";
import authRoutes from "./authRoutes.js";
import secretRoutes from "./secretRoutes.js";
import likeRoutes from "./likeRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/secrets", secretRoutes);
router.use("/likes", likeRoutes);

export default router;
