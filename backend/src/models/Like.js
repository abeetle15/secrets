import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    secret: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Secret",
      required: true,
    },
  },
  { timestamps: true }
);

// the next index ensures that a user can only like any given secret once
likeSchema.index({ user: 1, secret: 1 }, { unique: true });

likeSchema.index({ secret: 1 });

export default mongoose.model("Like", likeSchema);
