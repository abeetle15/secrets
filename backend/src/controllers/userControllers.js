import mongoose from "mongoose";
import { User, Secret } from "../models/index.js";
import { userExists } from "../utils/userUtils.js";

export async function getUserInfo(req, res) {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findOne(
      { _id: userId },
      "username followers following isAnon profile createdAt"
    ).populate("profile", "bio avatar");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User was not found with that id" });
    }

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({
      message: "An error ocurred fetching that user.",
      error: error.message,
    });
  }
}

export async function getUsersSecrets(req, res) {
  const userId = req.params.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const secrets = await Secret.find(
      { author: userId },
      "content likesCount commentsCount createdAt"
    );

    if (!secrets) {
      return res
        .status(404)
        .json({ message: "No secrets were found with that user id" });
    }

    res.status(200).json({
      message: "Secrets for this user fetched successfully",
      data: secrets,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error ocurred fetching secrets from that user.",
      error: error.message,
    });
  }
}

export async function updateUserInfo(req, res) {
  const userId = req.params.userId;
  const authenticatedId = req.user.id;
  const { username, isAnon, profile } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    if (userId !== authenticatedId) {
      return res.status(403).json({
        message:
          "Only the user in question is authorized to change profile details",
      });
    }

    const updates = {};

    if (username) updates.username = username;
    if (isAnon !== undefined) updates.isAnon = isAnon;
    if (profile) {
      if (profile.bio) updates["profile.bio"] = profile.bio;
      if (profile.avatar) updates["profile.avatar"] = profile.avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    })
      .select("username isAnon profile updatedAt")
      .populate("profile", "bio avatar");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found with that ID" });
    }

    res.status(200).json({
      message: "User updated successfully",
      updated_user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the user",
      error: error.message,
    });
  }
}
// Follow/Unfollow
// Get User’s Activity (Likes etc.)
// Password Management
