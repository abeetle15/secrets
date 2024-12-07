import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isAnon: { type: Boolean, default: true },
    role: { type: String, enum: ["user", "admin", "mod"], default: "user" },
    profile: {
      bio: { type: String, maxlength: 300 },
      avatar: { type: String },
    },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
