import { User } from "../models/index.js";

export async function userExists(username) {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw new Error("Error checking user existence.");
  }
}
