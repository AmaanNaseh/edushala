const QuizModel = require("../models/quizModel");

// Add a new quiz result
const addQuizResult = async (req, res) => {
  try {
    const { subject, score } = req.body;

    if (!subject || score === undefined) {
      return res
        .status(400)
        .json({ message: "Subject and score are required" });
    }

    const quizResult = new QuizModel({
      userId: req.user.userId, // Extracted from the authenticated user
      subject,
      score,
    });

    await quizResult.save();

    res.status(201).json({ message: "Quiz result saved successfully" });
  } catch (error) {
    console.error("Error saving quiz result:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all quiz results for a user
const getUserQuizResults = async (req, res) => {
  try {
    const quizResults = await QuizModel.find({ userId: req.user.userId });

    res.status(200).json({ quizResults });
  } catch (error) {
    console.error("Error fetching quiz results:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addQuizResult, getUserQuizResults };
