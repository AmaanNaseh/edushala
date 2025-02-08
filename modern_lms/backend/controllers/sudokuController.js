const SudokuModel = require("../models/sudokuModel");

/*
ROUTE           /api/sudoku
DESCRIPTION     Create one game time
PARAMETERS      NONE
METHOD          POST
ACCESS          PRIVATE (protected by middleware)
*/

const createSudokuTry = async (req, res) => {
  try {
    const { level, completionTime } = req.body;
    console.log("Request Body:", req.body);

    if (!level || !completionTime) {
      return res
        .status(400)
        .json({ message: "Level and completion time are required." });
    }

    const newTry = new SudokuModel({
      level,
      completionTime,
      user: req.user.userId,
    });
    console.log("New Sudoku Try:", newTry);

    await newTry.save();
    res.status(201).json({ message: "Sudoku try saved successfully", newTry });
  } catch (err) {
    console.error("Error saving Sudoku try:", err.message);
    res.status(500).json({ message: "Failed to save Sudoku try." });
  }
};

/*
ROUTE           /api/sudoku
DESCRIPTION     Get all game times for the logged-in user
PARAMETERS      NONE
METHOD          GET
ACCESS          PRIVATE (protected by middleware)
*/

const getSudokuData = async (req, res) => {
  try {
    const allTries = await SudokuModel.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ allTries });
  } catch (err) {
    console.error("Error fetching Sudoku data:", err.message);
    res.status(500).json({ message: "Failed to fetch Sudoku data." });
  }
};

/*
ROUTE           /api/sudoku/:id
DESCRIPTION     Delete try based on Id
PARAMETERS      id
METHOD          DELETE
ACCESS          PRIVATE (protected by middleware)
*/

const deleteSudoku = async (req, res) => {
  try {
    const oneTry = await SudokuModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // Ensure the user can only delete their own tries
    });

    if (!oneTry) {
      return res.status(404).json({ msg: "Try not found or unauthorized" });
    }

    res.status(200).json({ msg: "Try deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSudokuTry, getSudokuData, deleteSudoku };
