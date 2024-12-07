import mongoose from "mongoose";

const secretSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    isAnon: { type: Boolean },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

secretSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model("Secret", secretSchema);
