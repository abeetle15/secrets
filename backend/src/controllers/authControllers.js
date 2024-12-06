import { User } from "../models/index.js";
import { userExists } from "../utils/userUtils.js";
import config from "../config/environment.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await userExists(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      username,
      password: hashedPwd,
    });

    res.status(201).json({
      message: "User successfully created",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error has ocurred", error });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userExists(username);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPwdValid = await bcrypt.compare(password, user.password);
    if (!isPwdValid) {
      return res.status(400).json({ message: "Password is not valid" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Successful login",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "An error has ocurred", error });
  }
}
