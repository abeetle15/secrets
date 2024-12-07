import { Secret } from "../models/index.js";

export async function postSecret(req, res) {
  try {
    const content = req.body.content;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Invalid secret content" });
    }

    const newSecret = await Secret.create({
      content: content.trim(),
      author: userId,
    });

    res.status(201).json({
      message: "Secret posted successfully",
      secret: newSecret,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has ocurred posting your secret", error });
  }
}

export async function getAllSecrets(req, res) {
  try {
    const {
      author,
      sortBy = "createdAt",
      order = "desc",
      limit = 50,
      page = 1,
    } = req.query;

    const query = {};
    const skip = (page - 1) * limit;
    const sortOrder = order === "desc" ? -1 : 1;

    if (author) query.author = author;

    const allSecrets = await Secret.find(
      query,
      "content author likes comments createdAt"
    )
      .populate("author", "username")
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip(skip);

    res
      .status(200)
      .json({ message: "Secrets fetched successfully", payload: allSecrets });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has ocurred fetching all secrets", error });
  }
}
