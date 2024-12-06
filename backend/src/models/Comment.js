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
      required: true,
    },
    content: { type: String, maxlength: 200, minlength: 1, required: true },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

commentSchema.index({ secret: 1, author: 1 });
commentSchema.index({ parentComment: 1 });

commentSchema.virtual("repliesCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
  count: true,
});

export default mongoose.model("Comment", commentSchema);
