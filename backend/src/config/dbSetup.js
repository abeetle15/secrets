import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./environment.js";

async function connectDb() {
  try {
    await mongoose.connect(config.mongoDbUri);
    console.log("Connected to MongoDB!!!");
  } catch (error) {
    console.error(":(");
  }
}

export default connectDb;
