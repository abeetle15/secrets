import mongoose from "mongoose";
import { Like, Secret } from "../models/index.js";
import {
  findLikeByUser,
  getLikeCountForSecret,
  getLikesForSecret,
} from "../utils/likeUtils.js";

export async function createLike(req, res) {
  const userId = req.user.id;
  const secretId = req.params.secretId;

  try {
    if (!mongoose.Types.ObjectId.isValid(secretId)) {
      return res.status(400).json({ message: "Invalid secret ID" });
    }

    const secretExists = await Secret.findOne({ _id: secretId });

    if (!secretExists) {
      return res.status(404).json({ message: "Secret does not exist" });
    }

    const likeByThisUser = await findLikeByUser(secretId, userId);

    if (likeByThisUser) {
      return res
        .status(403)
        .json({ message: "This user has already liked this" });
    }

    const newLike = await Like.create({
      user: userId,
      secret: secretId,
    });

    await Secret.findByIdAndUpdate(secretId, { $inc: { likesCount: 1 } });

    res
      .status(201)
      .json({ message: "Like created successfully", like_id: newLike._id });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred creating your like",
      error: error.message,
    });
  }
}
