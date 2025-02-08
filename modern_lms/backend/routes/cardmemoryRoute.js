const express = require("express");
const protectRoute = require("../middleware/authMiddleware"); // Authentication middleware
const {
  createCardMemoryTry,
  getCardMemoryData,
  deleteCardMemory,
} = require("../controllers/cardmemoryController.js");

const router = express.Router();

// Protect the routes with the middleware
router.get("/", protectRoute, getCardMemoryData); // Protected GET route
router.post("/", protectRoute, createCardMemoryTry); // Protected POST route
router.delete("/:id", protectRoute, deleteCardMemory); // Protected DELETE route

module.exports = router;
