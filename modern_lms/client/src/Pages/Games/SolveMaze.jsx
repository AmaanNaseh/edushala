import React, { useState, useEffect } from "react";

const easyMaze = [
  ["I", " ", " ", "#", "#"],
  [" ", "#", " ", " ", "#"],
  [" ", " ", "#", " ", " "],
  ["#", " ", "#", " ", "#"],
  ["#", "", "# ", " ", "O"],
];

const mediumMaze = [
  ["I", "#", "#", "#", "#", "#", "#", "#"],
  [" ", " ", "#", " ", " ", " ", " ", "#"],
  ["#", " ", "#", " ", "#", "#", " ", "#"],
  ["#", " ", "#", " ", " ", "#", " ", "#"],
  ["#", " ", " ", " ", " ", "#", " ", "#"],
  ["#", "#", " ", "#", " ", "#", " ", "#"],
  ["#", " ", " ", " ", "#", " ", "#", "#"],
  ["#", " ", "#", " ", " ", " ", " ", "O"],
];

const difficultMaze = [
  ["I", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
  [" ", " ", "#", " ", " ", " ", " ", " ", " ", "#"],
  ["#", " ", "#", " ", "#", "#", " ", " ", "#", "#"],
  ["#", "", "#", " ", " ", "#", " ", "#", " ", "#"],
  ["#", " ", " ", " ", " ", "#", " ", " ", " ", "#"],
  ["#", "#", " ", "#", " ", "#", " ", "#", " ", "#"],
  ["#", " ", " ", " ", "#", " ", "#", " ", " ", "#"],
  ["#", " ", "#", " ", " ", " ", " ", "#", " ", "#"],
  ["#", " ", " ", "#", "#", " ", "#", " ", " ", " "],
  ["#", "#", "#", "#", "#", "#", "#", "#", "#", "O"],
];

const SolveMaze = () => {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [isSolved, setIsSolved] = useState(false);

  const movePlayer = (dx, dy) => {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Check if the new position is within bounds and not a wall
    if (
      newX >= 0 &&
      newX < difficultMaze.length &&
      newY >= 0 &&
      newY < difficultMaze[0].length &&
      difficultMaze[newX][newY] !== "#"
    ) {
      setPlayerPos({ x: newX, y: newY });
    }
  };

  // Listen for key press events for arrow keys
  const handleKeyPress = (event) => {
    if (isSolved) return; // Don't allow movement after solving the maze

    if (event.key === "ArrowUp") {
      movePlayer(-1, 0); // Move up
    } else if (event.key === "ArrowDown") {
      movePlayer(1, 0); // Move down
    } else if (event.key === "ArrowLeft") {
      movePlayer(0, -1); // Move left
    } else if (event.key === "ArrowRight") {
      movePlayer(0, 1); // Move right
    }
  };

  useEffect(() => {
    // Check if the player reached the goal (position of "O")
    if (playerPos.x === 9 && playerPos.y === 9) {
      setIsSolved(true);
    }
  }, [playerPos]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playerPos, isSolved]);

  const renderMaze = () => {
    return difficultMaze.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === playerPos.x && colIndex === playerPos.y) {
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-blue-500 flex items-center justify-center text-white font-semibold"
            >
              P
            </div>
          );
        }
        return (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 border ${
              cell === "#"
                ? "bg-black"
                : cell === "O"
                ? "bg-green-500 text-white"
                : cell === "I"
                ? "bg-red-500 text-white"
                : "bg-white"
            }`}
          ></div>
        );
      });
    });
  };

  return (
    <div className="p-4 space-y-6 lg:min-h-[115vh]">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        Solve The Maze
      </h1>

      <h2 className="md:text-lg text-center font-semibold">
        Use Arrow Keys to Move (Aim is to reach green box)
      </h2>

      <div className="grid grid-cols-10 gap-1 mx-auto w-fit">
        {renderMaze()}
      </div>

      {isSolved && (
        <div className="text-xl font-bold text-green-500 text-center">
          Congratulations !!! You have solved the Maze
        </div>
      )}
    </div>
  );
};

export default SolveMaze;
