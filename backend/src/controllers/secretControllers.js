import { Secret } from "../models/index.js";
import { findSecretById } from "../utils/secretUtils.js";

export async function postSecret(req, res) {
  try {
    const content = req.body.content;
    const user = req.user;
    const isAnon = user.isAnon;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Invalid secret content" });
    }

    const newSecret = await Secret.create({
      content: content.trim(),
      isAnon: isAnon,
      author: isAnon ? null : user.id,
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
      isAnon,
      sortBy = "createdAt",
      order = "desc",
      limit = 50,
      page = 1,
    } = req.query;

    const skip = (page - 1) * limit;
    const sortOrder = order === "desc" ? -1 : 1;

    const query = {};
    if (author) query.author = author;
    if (isAnon) query.isAnon = isAnon;

    const allSecrets = await Secret.find(
      query,
      "content author likesCount createdAt isAnon"
    )
      .populate("author", "username")
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip(skip)
      .lean();

    const allSecretsWithAuthors = allSecrets.map((secret) => {
      return {
        ...secret,
        author: secret.isAnon ? "Anon" : secret.author,
      };
    });

    res.status(200).json({
      message: "Secrets fetched successfully",
      payload: allSecretsWithAuthors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has ocurred fetching all secrets", error });
  }
}

export async function deleteSecret(req, res) {
  try {
    const id = req.params.id;
    const secret = await findSecretById(id);

    if (!secret) {
      return res.status(400).json({ message: "No secret found with this id" });
    }

    if (req.user.id !== secret.author.toString() && req.user.role === "user") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this secret" });
    }

    const response = await Secret.deleteOne({ _id: id });

    res.status(200).json({
      message: "Secret successfully deleted",
      db_response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred deleting this secret",
      error: error.message,
    });
  }
}
