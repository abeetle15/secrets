import express from "express";
import { signup, login } from "../controllers/authControllers.js";
import { validateSignupInput } from "../middlewares/validateSignup.js";

const router = express.Router();

router.post("/signup", validateSignupInput, signup);
router.post("/login", login);

export default router;
