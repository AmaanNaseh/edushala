require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const bookRoute = require("./routes/bookRoute");
const sudokuRoute = require("./routes/sudokuRoute");
const cardmemoryRoute = require("./routes/cardmemoryRoute");
const userRoute = require("./routes/userRoute"); // Add user route here
const quizRoute = require("./routes/quizRoute");
const courseRoute = require("./routes/courseRoute");

const exp = express();
exp.use(cors());

exp.use(express.json());
exp.use(bodyParser.json({ limit: "50mb" }));
exp.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Base route
exp.get("/", (req, res) => {
  res.status(200).send("Welcome to the Learning Management System API");
});

// Use the routes
exp.use("/api/books", bookRoute);
exp.use("/api/sudoku", sudokuRoute);
exp.use("/api/cardmemory", cardmemoryRoute);
exp.use("/api/users", userRoute); // Add user routes for signup/login
exp.use("/api/quiz", quizRoute);
exp.use("/api/courses", courseRoute); // LMS Course Routes

// MongoDB connection and server setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    exp.listen(process.env.PORT || 5001, () => {
      console.log(`Server started running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
