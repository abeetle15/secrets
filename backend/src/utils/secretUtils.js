import { Secret } from "../models/index.js";

export async function findSecretById(id) {
  try {
    const secret = await Secret.findOne({ _id: id });
    return secret;
  } catch (error) {
    console.error("Error finding secret with id", error);
    throw new Error("Error finding secret with id");
  }
}
