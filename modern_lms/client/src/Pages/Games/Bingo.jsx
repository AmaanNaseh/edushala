import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generateRandomGrid = () => {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.reduce((grid, num, index) => {
    const row = Math.floor(index / 5);
    grid[row] = [...(grid[row] || []), num];
    return grid;
  }, []);
};

const calculatePoints = (grid) => {
  let points = 0;

  // Check rows
  grid.forEach((row) => {
    if (row.every((cell) => cell === "X")) points += 1;
  });

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (grid.every((row) => row[col] === "X")) points += 1;
  }

  // Check diagonals
  if (grid.every((row, i) => row[i] === "X")) points += 1; // Left-to-right diagonal
  if (grid.every((row, i) => row[4 - i] === "X")) points += 1; // Right-to-left diagonal

  return points;
};

const Bingo = () => {
  const [playerGrid, setPlayerGrid] = useState(
    Array(5).fill(Array(5).fill(""))
  );
  const [computerGrid, setComputerGrid] = useState(generateRandomGrid());
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);
  const [currentTurn, setCurrentTurn] = useState("Player");
  const [winner, setWinner] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState(new Set());
  const [lastComputerCall, setLastComputerCall] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [bingoCut, setBingoCut] = useState([false, false, false, false, false]);

  const checkGridCompletion = () => {
    for (let row of playerGrid) {
      for (let cell of row) {
        if (cell === "") {
          toast.error("Please fill in the complete table.");
          return false;
        }
      }
    }
    return true;
  };

  const handleCellInput = (rowIndex, colIndex, value) => {
    if (gameStarted || winner) return;
    const numericValue = Number(value);

    // Check if the number is within the valid range
    if (numericValue < 1 || numericValue > 25) {
      return;
    }

    if (numericValue !== 1 && numericValue !== 2) {
      // Check if the number is a duplicate in the grid
      const isDuplicate = playerGrid.flat().includes(numericValue);
      if (isDuplicate) {
        toast.error(
          "Duplicate number. Each number must be unique in the grid."
        );
        return;
      }
    }

    const newGrid = playerGrid.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? numericValue : cell
      )
    );
    setPlayerGrid(newGrid);
  };

  const handleNumberCall = (calledNumber) => {
    if (winner || calledNumbers.has(calledNumber)) {
      toast.error("Number already used, try something else.");
      return;
    }

    setCalledNumbers(new Set(calledNumbers).add(calledNumber));

    if (currentTurn === "Computer") {
      setLastComputerCall(calledNumber);
    }

    setTimeout(() => {
      const updateGrid = (grid) =>
        grid.map((row) =>
          row.map((cell) => (cell == calledNumber ? "X" : cell))
        );

      const updatedPlayerGrid = updateGrid(playerGrid);
      const updatedComputerGrid = updateGrid(computerGrid);

      setPlayerGrid(updatedPlayerGrid);
      setComputerGrid(updatedComputerGrid);

      const playerNewPoints = calculatePoints(updatedPlayerGrid);
      const computerNewPoints = calculatePoints(updatedComputerGrid);

      setPlayerPoints(playerNewPoints);
      setComputerPoints(computerNewPoints);

      // Update the bingo cuts
      const updatedBingoCut = [...bingoCut];
      if (playerNewPoints >= 1 && playerNewPoints <= 5) {
        updatedBingoCut[playerNewPoints - 1] = true; // Mark the corresponding BINGO letter
      }
      setBingoCut(updatedBingoCut);

      if (playerNewPoints === 5 || computerNewPoints === 5) {
        setWinner(playerNewPoints === 5 ? "Player" : "Computer");
      }

      setCurrentTurn(currentTurn === "Player" ? "Computer" : "Player");
    }, 1000);
  };

  useEffect(() => {
    if (currentTurn === "Computer" && gameStarted && !winner) {
      const availableNumbers = Array.from(
        { length: 25 },
        (_, i) => i + 1
      ).filter((num) => !calledNumbers.has(num));
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const randomNumber = availableNumbers[randomIndex];

      setTimeout(() => {
        setLastComputerCall(randomNumber);
        handleNumberCall(randomNumber);
      }, 1000);
    }
  }, [currentTurn, winner]);

  const validateInput = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 25) {
      e.target.value = "";
    }
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const value = e.target.value;
    if (value === "") {
      handleCellInput(rowIndex, colIndex, value);
      return;
    }

    const numericValue = Number(value);

    if (numericValue >= 0 && numericValue <= 25) {
      handleCellInput(rowIndex, colIndex, numericValue);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        Bingo
      </h1>

      {!gameStarted && !winner && (
        <div className="flex items-center justify-center">
          <button
            className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
            onClick={() => {
              if (checkGridCompletion()) {
                setGameStarted(true);
              }
            }}
          >
            Start Game
          </button>
        </div>
      )}

      {gameStarted && !winner && (
        <div className="space-y-4 flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold">{currentTurn}'s Turn</h2>
          <div className="flex items-center space-x-4">
            <input
              className="border-black border-[2px] rounded p-2"
              type="number"
              placeholder="Enter a number to call"
              id="player-number"
              onBlur={validateInput}
              min={0}
            />
            <button
              className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
              onClick={() => {
                const input = document.getElementById("player-number");
                const value = Number(input.value);
                if (value >= 1 && value <= 25) {
                  handleNumberCall(value);
                  input.value = "";
                }
              }}
            >
              Submit
            </button>
          </div>

          {currentTurn === "Computer" && lastComputerCall && (
            <p className="text-lg font-semibold">
              Computer said: {lastComputerCall}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {/* Player's Grid */}
        <div className="flex gap-8 items-center justify-center">
          <div>
            <h2 className="text-xl text-center font-semibold my-2 mb-5">
              Player's Grid
            </h2>
            <div className="grid grid-cols-5 gap-1">
              {playerGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-12 h-12 flex items-center justify-center border-[2px] border-black rounded ${
                      cell === "X" ? "bg-[#00FF9C] text-white" : ""
                    }`}
                  >
                    {gameStarted ? (
                      cell
                    ) : (
                      <input
                        className="w-full h-full text-center outline-none"
                        type="number"
                        value={cell}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, colIndex)
                        }
                        onBlur={validateInput}
                        min={0}
                        max={25}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* BINGO Text with Strikethrough */}
          <div className="text-center mt-10">
            <h2
              className={`text-3xl font-bold ${
                bingoCut[0] ? "line-through" : ""
              }`}
            >
              B
            </h2>
            <h2
              className={`text-3xl font-bold ${
                bingoCut[1] ? "line-through" : ""
              }`}
            >
              I
            </h2>
            <h2
              className={`text-3xl font-bold ${
                bingoCut[2] ? "line-through" : ""
              }`}
            >
              N
            </h2>
            <h2
              className={`text-3xl font-bold ${
                bingoCut[3] ? "line-through" : ""
              }`}
            >
              G
            </h2>
            <h2
              className={`text-3xl font-bold ${
                bingoCut[4] ? "line-through" : ""
              }`}
            >
              O
            </h2>
          </div>
        </div>

        {winner && (
          <div>
            {/* Computer's Grid */}
            <h2 className="text-xl text-center font-semibold my-2 mb-5">
              Computer's Grid
            </h2>
            <div className="grid grid-cols-5 gap-1">
              {computerGrid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-12 h-12 flex items-center justify-center border-[2px] border-black rounded ${
                      cell === "X" ? "bg-red-500 text-white" : ""
                    }`}
                  >
                    {gameStarted ? (
                      cell
                    ) : (
                      <input
                        className="w-full h-full text-center outline-none"
                        type="number"
                        value={cell}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, colIndex)
                        }
                        onBlur={validateInput}
                        min={0}
                        max={25}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {winner && (
        <h2 className="text-xl font-bold text-green-500 text-center">
          {winner} Wins!
        </h2>
      )}

      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default Bingo;
