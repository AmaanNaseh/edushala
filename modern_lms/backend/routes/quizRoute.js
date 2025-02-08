const express = require("express");
const {
  addQuizResult,
  getUserQuizResults,
} = require("../controllers/quizController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protectRoute, addQuizResult); // Protected route to add a quiz result
router.get("/results", protectRoute, getUserQuizResults); // Protected route to get all quiz results for the logged-in user

module.exports = router;
