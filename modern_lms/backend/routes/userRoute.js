const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); // Public
router.post("/login", loginUser); // Public
router.get("/profile", protectRoute, getUserProfile); // Protected
router.delete("/delete", protectRoute, deleteUser); // Protected
router.put("/update", protectRoute, updateUser); // Protected

module.exports = router;
