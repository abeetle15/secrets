import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    secret: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Secret",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, maxlength: 200, minlength: 1, required: true },
  },
  { timestamps: true }
);

commentSchema.index({ secret: 1, author: 1 });

export default mongoose.model("Comment", commentSchema);
