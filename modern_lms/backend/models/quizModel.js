const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt` fields
);

const QuizModel = mongoose.model("Quiz", QuizSchema);

module.exports = QuizModel;
