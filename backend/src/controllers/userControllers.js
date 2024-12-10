import mongoose from "mongoose";
import { User, Secret, Like } from "../models/index.js";
import { userExists } from "../utils/userUtils.js";
import bcrypt from "bcrypt";

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

export async function followOtherUser(req, res) {
  const userToUnfollowId = req.params.userToUnfollowId;
  const currentUserId = req.user.id;

  try {
    const currentUser = await User.findOne({ _id: currentUserId });
    const userToUnfollow = await User.findOne({ _id: userToUnfollowId });

    if (!currentUser || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (currentUserId === userToUnfollow) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
    if (currentUser.following.includes(userToUnfollowId)) {
      return res.status(400).json({ message: "You already follow this user" });
    }

    currentUser.following.push(userToUnfollowId);
    userToUnfollow.followers.push(currentUserId);

    await currentUser.save();
    await userToUnfollow.save();

    res
      .status(200)
      .json({ message: "You successfully followed the other user" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while trying to follow the user",
      error: error.message,
    });
  }
}
export async function unfollowOtherUser(req, res) {
  const userToUnfollowId = req.params.userToUnfollowId;
  const currentUserId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(userToUnfollowId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    if (currentUserId === userToUnfollowId) {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const userToUnfollow = await User.findById(userToUnfollowId);

    if (!currentUser || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!currentUser.following.includes(userToUnfollowId)) {
      return res.status(400).json({ message: "You don't follow this user" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userToUnfollowId
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );

    await currentUser.save();
    await userToUnfollow.save();

    res
      .status(200)
      .json({ message: "You successfully unfollowed the other user" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while trying to unfollow the user",
      error: error.message,
    });
  }
}

export async function getUserLikes(req, res) {
  const userId = req.params.userId;
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const page = Math.max(Number(req.query.page) || 1, 1);
  const skip = (page - 1) * limit;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findOne({ _id: userId }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLikes = await Like.find({ user: userId }, "secret")
      .populate("secret", "content author likesCount commentsCount createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    if (!userLikes.length) {
      return res.status(404).json({ message: "No likes found for this user" });
    }

    res.status(200).json({
      message: "Likes successfully fetched",
      data: userLikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching this user's likes",
      error: error.message,
    });
  }
}

export async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pwdsMatch = await bcrypt.compare(oldPassword, user.password);

    if (!pwdsMatch) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedPwd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPwd;
    await user.save();

    res.status(200).json({ message: "Password was updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
}
