import React, { useState, useEffect } from "react";

const generateSequence = (size) => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "purple",
    "orange",
  ];
  const textColors = [
    "red",
    "blue",
    "green",
    "yellow",
    "black",
    "white",
    "purple",
    "orange",
  ];
  const sequence = Array.from({ length: size }, () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const textColor = textColors[Math.floor(Math.random() * textColors.length)];
    return { color, textColor };
  });
  return sequence;
};

const WordsColorMatch = () => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [correctGridSelections, setCorrectGridSelections] = useState([]);
  const [incorrectGridSelections, setIncorrectGridSelections] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false); // Track if all levels are completed

  const levels = [4, 8, 12, 16, 20];

  useEffect(() => {
    if (level <= levels.length) {
      const newSequence = generateSequence(levels[level - 1]);
      setSequence(newSequence);
      setOptions(shuffleOptions(newSequence));
      setUserSequence([]);
      setMessage("");
      setCorrectGridSelections([]); // Reset correct selections when level changes
      setIncorrectGridSelections([]); // Reset incorrect selections when level changes
    }
  }, [level]);

  const shuffleOptions = (sequence) => {
    const correctColors = sequence.map((item) => item.textColor);
    const allColors = [
      "red",
      "blue",
      "green",
      "yellow",
      "black",
      "white",
      "purple",
      "orange",
    ];
    const optionsSet = new Set(correctColors);

    while (optionsSet.size < 4) {
      const randomColor =
        allColors[Math.floor(Math.random() * allColors.length)];
      optionsSet.add(randomColor);
    }

    return Array.from(optionsSet).sort(() => Math.random() - 0.5);
  };

  const handleColorClick = (color) => {
    if (isGameOver) return;

    const currentIndex = userSequence.length;
    const correctColor = sequence[currentIndex].textColor;

    if (color === correctColor) {
      setUserSequence((prev) => [...prev, color]);
      setCorrectGridSelections((prev) => [...prev, currentIndex]);

      if (currentIndex + 1 === sequence.length) {
        if (level === levels.length) {
          setMessage("Congratulations! You completed all levels!");
          setIsCompleted(true); // Mark as completed after finishing the last level
        } else {
          setMessage("Correct! Proceeding to the next level.");
          setTimeout(() => setLevel((prev) => prev + 1), 1000);
        }
      }
    } else {
      setMessage("You Lost! Try Again.");
      setIncorrectGridSelections((prev) => [...prev, currentIndex]);
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setLevel(1); // Reset level to 1
    setUserSequence([]); // Clear user sequence
    setMessage(""); // Reset message
    setIsGameOver(false); // Reset game over state
    setCorrectGridSelections([]); // Reset correct grid selections
    setIncorrectGridSelections([]); // Reset incorrect grid selections
    setIsCompleted(false); // Reset completion state

    const newSequence = generateSequence(levels[0]); // Generate sequence for level 1
    setSequence(newSequence); // Set the new sequence
    setOptions(shuffleOptions(newSequence)); // Shuffle the options
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        The Color Match Game
      </h1>

      <div className="flex flex-col items-center justify-center gap-8">
        <p className="text-black font-bold text-xl">Level: {level}</p>

        <div className="grid gap-4 md:gap-6 lg:gap-8 mb-4 grid-cols-4">
          {sequence.map((item, index) => (
            <div
              key={index}
              className="relative text-md md:text-2xl lg:text-3xl font-bold flex items-center justify-center bg-white w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg shadow-md shadow-black/40 border-black border-[1px] z-10"
              style={{ color: item.textColor }}
            >
              {correctGridSelections.includes(index) && (
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 text-green-500 text-4xl md:text-5xl">
                  ✅
                </span>
              )}
              {incorrectGridSelections.includes(index) && (
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 text-red-500 text-4xl md:text-5xl">
                  ❌
                </span>
              )}
              <span
                style={{
                  textShadow: "1px 1px 0px rgba(0, 0, 0, 1)",
                }}
                className="z-10"
              >
                {item.color}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {options.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(color)}
              className="py-2 px-4 bg-black text-white text-lg md:text-xl lg:text-2xl font-bold rounded-md focus:outline-none"
            >
              {color}
            </button>
          ))}
        </div>

        {message && (
          <p
            className={`font-bold mt-2 text-center ${
              message.includes("Lost") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        {(isGameOver || isCompleted) && (
          <button
            onClick={resetGame}
            className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 hover:scale-105"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WordsColorMatch;
