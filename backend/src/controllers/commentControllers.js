import { Comment, Secret } from "../models/index.js";

export async function addComment(req, res) {
  const user = req.user;
  const isAnon = user.isAnon;
  const content = req.body.content;
  const secretId = req.params.secretId;

  try {
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Invalid secret content" });
    }

    const newComment = await Comment.create({
      secret: secretId,
      content: content.trim(),
      author: isAnon ? null : user.id,
      isAnon: isAnon,
    });

    await Secret.findByIdAndUpdate(secretId, { $inc: { commentsCount: 1 } });

    res.status(201).json({
      message: "Comment posted successfully",
      secret: newComment,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred posting your comment",
      error: error.message,
    });
  }
}

export async function getCommentsForPost(req, res) {
  const secretId = req.params.secretId;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  try {
    const secret = await Secret.findOne({ _id: secretId });

    if (!secret) {
      return res
        .status(404)
        .json({ message: "Secret not found. Couldn't fetch comments." });
    }

    const allComments = await Comment.find(
      { secret: secretId },
      "author content createdAt"
    )
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    res
      .status(200)
      .json({ message: "Comments successfully fetched", data: allComments });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred fetching the comments for this secret",
      error: error.message,
    });
  }
}

export async function removeComment(req, res) {
  const user = req.user;
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findOne({ _id: commentId });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found. Couldn't delete." });
    }

    if (comment.author.toString() !== user.id) {
      return res.status(403).json({
        message: "Only the original author can delete their comment.",
      });
    }

    const db_response = await Comment.deleteOne({ _id: commentId });
    await Secret.findByIdAndUpdate(comment.secret, {
      $inc: { commentsCount: -1 },
    });

    res.status(200).json({
      message: "Comment removed successfully",
      db_response: db_response,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred removing your comment",
      error: error.message,
    });
  }
}
