const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    bookname: {
      type: String,
      required: true,
    },
    booksubject: {
      type: String,
      required: true,
    },
    booklink: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminName: {
      // New field to store the admin's name
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;
