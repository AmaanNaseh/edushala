const express = require("express");
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protectRoute, getBooks); // Get all books
router.get("/:id", protectRoute, getBook); // Get a single book
router.post("/", protectRoute, createBook); // Create a new book
router.put("/:id", protectRoute, updateBook); // Update a book
router.delete("/:id", protectRoute, deleteBook); // Delete a book

module.exports = router;
