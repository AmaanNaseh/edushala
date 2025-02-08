const mongoose = require("mongoose");

const SudokuSchema = mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
    },
    completionTime: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const SudokuModel = mongoose.model("Sudoku", SudokuSchema);
module.exports = SudokuModel;
