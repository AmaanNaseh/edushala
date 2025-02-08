const express = require("express");
const protectRoute = require("../middleware/authMiddleware"); // Authentication middleware
const {
  createSudokuTry,
  getSudokuData,
  deleteSudoku,
} = require("../controllers/sudokuController.js");

const router = express.Router();

// Protect the routes with the middleware
router.get("/", protectRoute, getSudokuData); // Protected GET route
router.post("/", protectRoute, createSudokuTry); // Protected POST route
router.delete("/:id", protectRoute, deleteSudoku); // Protected DELETE route

module.exports = router;
