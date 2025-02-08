const CourseModel = require("../models/courseModel");
const UserModel = require("../models/userModel"); // Import UserModel
const mongoose = require("mongoose");

// ✅ Add a Course (Only Admins)
const addCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can add courses." });
    }

    const { title, description, modules } = req.body;

    if (!title || !description || !modules || modules.length === 0) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Fetch the admin's full name from UserModel using userId
    const admin = await UserModel.findById(req.user.userId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const adminName = admin.userFullName; // Set the admin's full name

    const newCourse = new CourseModel({
      title,
      description,
      modules,
      adminId: req.user.userId,
      adminName, // Use userFullName from UserModel
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Courses Uploaded by Admin
const getAdminCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ adminId: req.user.userId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// ✅ Get All Available Courses (For Users)
const getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// ✅ Get a Course by ID (For viewing details)

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await CourseModel.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    res.status(500).json({ message: "Failed to fetch course details" });
  }
};

// ✅ Purchase a Course
const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user already purchased the course
    if (course.purchasedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already purchased this course." });
    }

    course.purchasedBy.push(userId);
    await course.save();

    res.status(200).json({ message: "Course purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to purchase course" });
  }
};

// ✅ Update a Course
const updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can update courses." });
    }

    const { title, description, modules } = req.body;
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.modules = modules || course.modules;

    await course.save();
    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course" });
  }
};

// ✅ Delete a Course
const deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can delete courses." });
    }

    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

module.exports = {
  addCourse,
  getAdminCourses,
  getAllCourses,
  purchaseCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
};
