const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Only allow "user" or "admin"
    default: "user", // Default role is "user"
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
