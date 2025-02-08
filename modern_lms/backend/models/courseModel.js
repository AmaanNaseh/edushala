const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  modules: [
    {
      moduleTitle: { type: String, required: true },
      lectures: [
        {
          label: { type: String, required: true },
          videoLink: { type: String, required: true },
        },
      ],
    },
  ],
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adminName: { type: String, required: true },
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const CourseModel = mongoose.model("Course", CourseSchema);
module.exports = CourseModel;
