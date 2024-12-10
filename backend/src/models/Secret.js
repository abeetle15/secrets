import mongoose from "mongoose";

const secretSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isAnon: { type: Boolean },
  },
  { timestamps: true }
);

secretSchema.index({ author: 1, createdAt: -1 });

export default mongoose.model("Secret", secretSchema);
