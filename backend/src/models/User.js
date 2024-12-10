import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 16,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isAnon: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin", "mod"], default: "user" },
    profile: {
      bio: { type: String, maxlength: 300, default: "" },
      avatar: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
