import mongoose from "mongoose";
import { Like } from "../models/index.js";

export async function getLikesForSecret(secretId) {
  if (!mongoose.Types.ObjectId.isValid(secretId)) {
    throw new Error("Invalid secret ID");
  }

  try {
    const allLikes = await Like.find({ secret: secretId })
      .populate("user", "username")
      .select("user createdAt");

    return allLikes;
  } catch (error) {
    console.error("Error finding likes for this secret Id", error.message);
    throw new Error("Error finding likes for this secret Id");
  }
}

export async function getLikeCountForSecret(secretId) {
  if (!mongoose.Types.ObjectId.isValid(secretId)) {
    throw new Error("Invalid secret ID");
  }

  try {
    const likeCount = await Like.countDocuments({ secret: secretId });
    return likeCount;
  } catch (error) {
    console.error("Error finding likes for this secret Id", error.message);
    throw new Error("Error finding likes for this secret Id");
  }
}

export async function findLikeByUser(secretId, userId) {
  try {
    const likeByThisUser = await Like.findOne({
      secret: secretId,
      user: userId,
    }).populate("user", "username");
    return likeByThisUser;
  } catch (error) {
    console.error("Error finding likes for this secret Id", error.message);
    throw new Error("Error finding likes for this secret Id");
  }
}
