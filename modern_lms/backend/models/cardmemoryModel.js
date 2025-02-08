const mongoose = require("mongoose");

const CardMemorySchema = mongoose.Schema(
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
  {
    timestamps: true,
  }
);

const CardMemoryModel = mongoose.model("CardMemory", CardMemorySchema);
module.exports = CardMemoryModel;
