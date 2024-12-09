import { Like } from "../models/index.js";
import {
  findLikeByUser,
  getLikeCountForSecret,
  getLikesForSecret,
} from "../utils/likeUtils.js";

export async function createLike(req, res) {
  const userId = req.user.id;
  const secretId = req.params.secretId;

  try {
    const likeByThisUser = await findLikeByUser(secretId, userId);

    if (likeByThisUser) {
      return res
        .status(403)
        .json({ message: "This user has already liked this" });
    }

    await Like.create({
      user: userId,
      secret: secretId,
    });

    res.status(201).json({ message: "Like created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred creating your like",
      error: error.message,
    });
  }
}
