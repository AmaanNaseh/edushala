import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_API } from "../../Config/Config";

const Sudoku = () => {
  const [board, setBoard] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [level, setLevel] = useState("Easy");
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [completionTime, setCompletionTime] = useState(null);

  useEffect(() => {
    let interval;
    if (isTiming) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTiming]);

  useEffect(() => {
    if (completionTime !== null) {
      createSudokuTry();
    }
  }, [completionTime]); // Automatically call createSudokuTry when completionTime is updated

  const generateBoard = (size) => {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  };

  const validateBoard = (board) => {
    const size = board.length;
    for (let i = 0; i < size; i++) {
      let row = new Set(board[i].filter((n) => n !== null));
      if (row.size !== board[i].filter((n) => n !== null).length) return false;

      let col = new Set();
      for (let j = 0; j < size; j++) {
        if (board[j][i] !== null) {
          col.add(board[j][i]);
        }
      }
      if (col.size !== size) return false;
    }
    return true;
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setBoard(generateBoard(getBoardSize(e.target.value)));
    setCompleted(false);
    resetTimer();
  };

  const getBoardSize = (level) => {
    if (level === "Easy") return 4;
    if (level === "Medium") return 5;
    if (level === "Hard") return 7;
    return 4;
  };

  const handleChange = (rowIndex, colIndex, value) => {
    const newBoard = [...board];
    if (value === "" || value === null || value < 1 || value > board.length) {
      newBoard[rowIndex][colIndex] = null;
    } else {
      newBoard[rowIndex][colIndex] = parseInt(value);
    }

    setBoard(newBoard);

    if (validateBoard(newBoard)) {
      setCompleted(true);
      setIsTiming(false);
      setCompletionTime(timer);
    } else {
      setCompleted(false);
    }

    const row = new Set(newBoard[rowIndex].filter((n) => n !== null));
    const col = new Set();
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i][colIndex] !== null) col.add(newBoard[i][colIndex]);
    }

    if (
      row.size !== newBoard[rowIndex].filter((n) => n !== null).length ||
      col.size !== newBoard.filter((row) => row[colIndex] !== null).length
    ) {
      toast.error("Duplicate numbers in row or column!");
    }
  };

  useEffect(() => {
    setBoard(generateBoard(getBoardSize(level)));
    setCompleted(false);
  }, [level]);

  const startTimer = () => {
    setTimer(0);
    setIsTiming(true);
  };

  const resetTimer = () => {
    setIsTiming(false);
    setTimer(0);
    setCompletionTime(null);
  };

  const createSudokuTry = async () => {
    const token = localStorage.getItem("authToken");
    const sudokuTry = { level, completionTime };

    try {
      const response = await axios.post(
        `${backend_API}/api/sudoku`,
        sudokuTry,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Sudoku data saved successfully!");
      console.log("Sudoku Response:", response.data);
    } catch (error) {
      console.error(
        "Error saving Sudoku data:",
        error.response?.data || error.message
      );
      toast.error("Failed to save Sudoku data.");
    }
  };

  return (
    <>
      <div className="p-4 space-y-6 mb-12">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Sudoku
        </h1>
        <div className="flex flex-col items-center gap-4 p-4">
          <h2 className="text-xl font-semibold">Level : {level}</h2>

          <select
            value={level}
            onChange={handleLevelChange}
            className="font-semibold text-xl px-4 py-2 border-[2px] border-black"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            onClick={startTimer}
            className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
          >
            Start Game
          </button>

          <div className="text-lg font-semibold">
            Time:{" "}
            {completionTime !== null
              ? `${completionTime} seconds`
              : `${timer} seconds`}
          </div>

          <div
            className={`grid gap-1`}
            style={{
              gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
            }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  min="1"
                  max={board.length}
                  value={cell || ""}
                  onChange={(e) =>
                    handleChange(rowIndex, colIndex, e.target.value)
                  }
                  className="w-[40px] h-[40px] md:w-16 md:h-16 lg:w-20 lg:h-20 text-center border-[2px] border-black"
                />
              ))
            )}
          </div>

          {completed && (
            <p className="mt-4 text-xl text-green-500 font-semibold">
              Congratulations !!! You Win
            </p>
          )}
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default Sudoku;
