const CardMemoryModel = require("../models/cardmemoryModel");

/*
ROUTE           /api/cardmemory
DESCRIPTION     Create one game time
PARAMETERS      NONE
METHOD          POST
ACCESS          PRIVATE (protected by middleware)
*/

const createCardMemoryTry = async (req, res) => {
  try {
    const { level, completionTime } = req.body;

    if (!level || !completionTime) {
      return res
        .status(400)
        .json({ message: "Level and completion time are required." });
    }

    const newTry = await CardMemoryModel.create({
      level,
      completionTime,
      user: req.user.userId, // Ensure the user ID is correctly attached from the JWT
    });

    res
      .status(201)
      .json({ message: "Memory Match data saved successfully.", newTry });
  } catch (err) {
    console.error("Error saving Memory Match data:", err.message);
    res.status(500).json({ message: "Failed to save Memory Match data." });
  }
};

/*
ROUTE           /api/cardmemory
DESCRIPTION     Get all game times for the logged-in user
PARAMETERS      NONE
METHOD          GET
ACCESS          PRIVATE (protected by middleware)
*/

const getCardMemoryData = async (req, res) => {
  try {
    const allTries = await CardMemoryModel.find({ user: req.user.userId }).sort(
      { createdAt: -1 }
    );
    res.status(200).json({ allTries });
  } catch (err) {
    console.error("Error fetching Memory Match data:", err.message);
    res.status(500).json({ message: "Failed to fetch Memory Match data." });
  }
};

/*
ROUTE           /api/cardmemory/:id
DESCRIPTION     Delete try based on Id
PARAMETERS      id
METHOD          DELETE
ACCESS          PRIVATE (protected by middleware)
*/
const deleteCardMemory = async (req, res) => {
  try {
    const oneTry = await CardmemoryModel.findOneAndDelete({
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

module.exports = { createCardMemoryTry, getCardMemoryData, deleteCardMemory };
