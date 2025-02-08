const express = require("express");
const {
  addCourse,
  getAdminCourses,
  getAllCourses,
  purchaseCourse,
  updateCourse,
  deleteCourse,
  getCourseById, // Import the new controller for single course
} = require("../controllers/courseController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

// Admin - Add a Course
router.post("/add", protectRoute, addCourse);

// Admin - Get their own courses
router.get("/admin-courses", protectRoute, getAdminCourses);

// User - Get all courses
router.get("/all", getAllCourses);

// Admin or User - Get a single course by ID
router.get("/get-course/:id", protectRoute, getCourseById); // New route for viewing course details

// User - Purchase a course
router.post("/purchase", protectRoute, purchaseCourse);

// Admin - Update a Course
router.put("/update/:id", protectRoute, updateCourse);

// Admin - Delete a Course
router.delete("/delete/:id", protectRoute, deleteCourse);

module.exports = router;
