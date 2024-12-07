import express from "express";
import authRoutes from "./authRoutes.js";
import secretRoutes from "./secretRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/secrets", secretRoutes);

export default router;
