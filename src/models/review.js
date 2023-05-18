const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
      default: undefined,
    },

    body: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
