import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_API } from "../../Config/Config";

const generateCards = (size) => {
  const symbols = [
    "🐶",
    "🐱",
    "🦊",
    "🐼",
    "🦁",
    "🐸",
    "🐨",
    "🐧",
    "🐷",
    "🐔",
    "🦄",
    "🐯",
  ];
  const selectedSymbols = symbols.slice(0, size / 2);
  const cards = [...selectedSymbols, ...selectedSymbols].sort(
    () => Math.random() - 0.5
  );

  return cards.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [movesLeft, setMovesLeft] = useState(0);
  const [difficulty, setDifficulty] = useState(8);
  const [message, setMessage] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);
  const [level, setLevel] = useState("Easy");

  useEffect(() => {
    // Update the level based on difficulty
    if (difficulty === 8) setLevel("Easy");
    else if (difficulty === 16) setLevel("Medium");
    else if (difficulty === 24) setLevel("Hard");

    const initialMoves = difficulty === 8 ? 20 : difficulty === 16 ? 40 : 60;
    setCards(generateCards(difficulty));
    setMoves(0);
    setMovesLeft(initialMoves);
    setMessage("");
    setIsStarted(false);
    setElapsedTime(0);
    setCompletionTime(null);
  }, [difficulty]);

  useEffect(() => {
    let timer;
    if (isStarted && !completionTime) {
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, completionTime]);

  useEffect(() => {
    if (movesLeft === 0 && !message && moves !== 0) {
      setMessage("You Lost !!! Try Again");
      setIsStarted(false);
    } else if (
      cards.every((card) => card.isMatched) &&
      !message &&
      moves !== 0
    ) {
      setMessage("Congratulations !!! You Win");
      setIsStarted(false);
      setCompletionTime(elapsedTime);
    }
  }, [movesLeft, cards]);

  const handleCardClick = (id) => {
    if (movesLeft <= 0 || message) return;

    const newCards = [...cards];
    const card = newCards.find((card) => card.id === id);

    if (!card.isFlipped && flippedCards.length < 2) {
      card.isFlipped = true;
      setFlippedCards((prev) => [...prev, card]);
      setMoves((prev) => prev + 1);
      setMovesLeft((prev) => prev - 1);
    }

    if (flippedCards.length === 1) {
      const [firstCard] = flippedCards;

      if (firstCard.symbol === card.symbol) {
        card.isMatched = true;
        firstCard.isMatched = true;
      } else {
        setTimeout(() => {
          firstCard.isFlipped = false;
          card.isFlipped = false;
          setCards([...newCards]);
        }, 1000);
      }
      setFlippedCards([]);
    }

    setCards([...newCards]);
  };

  const resetGame = () => {
    const initialMoves = difficulty === 8 ? 20 : difficulty === 16 ? 40 : 60;
    setCards(generateCards(difficulty));
    setFlippedCards([]);
    setMoves(0);
    setMovesLeft(initialMoves);
    setMessage("");
    setIsStarted(false);
    setElapsedTime(0);
    setCompletionTime(null);
  };

  const startGame = () => {
    setIsStarted(true);
    setElapsedTime(0);
    setCompletionTime(null);
  };

  const createMemoryMatchTry = async () => {
    const token = localStorage.getItem("authToken");
    const memoryMatchTry = { level, completionTime };

    try {
      const response = await axios.post(
        `${backend_API}/api/cardmemory`,
        memoryMatchTry,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Memory Match data saved successfully!");
      console.log("Memory Match Response:", response.data);
    } catch (error) {
      console.error(
        "Error saving Memory Match data:",
        error.response?.data || error.message
      );
      toast.error("Failed to save Memory Match data.");
    }
  };

  useEffect(() => {
    if (completionTime !== null) {
      createMemoryMatchTry();
    }
  }, [completionTime]);

  return (
    <>
      <div className="p-4 space-y-6">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          The Memory Game
        </h1>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex items-center">
            <label className="mr-2 text-xl font-bold">Difficulty :</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="border-[2px] border-black rounded px-3 py-2"
            >
              <option value={8}>Easy</option>
              <option value={16}>Medium</option>
              <option value={24}>Hard</option>
            </select>
          </div>
          <button
            onClick={startGame}
            disabled={isStarted}
            className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
          >
            Start Game
          </button>
          <div className="text-lg font-semibold">
            Time:{" "}
            {completionTime !== null
              ? `${completionTime} seconds`
              : `${elapsedTime} seconds`}
          </div>
          <div className="flex items-center gap-8">
            <p className="text-white font-semibold bg-green-500 px-4 py-2 rounded-md">
              Moves: {moves}
            </p>
            <p className="font-semibold bg-red-500 text-white px-4 py-2 rounded-md">
              Moves Left: {movesLeft}
            </p>
          </div>

          <div
            className={`grid gap-4 ${
              difficulty === 8
                ? "grid-cols-4"
                : difficulty === 16
                ? "grid-cols-4"
                : "grid-cols-6"
            }`}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className={`cursor-pointer md:w-24 md:h-24 flex items-center justify-center bg-white border rounded shadow ${
                  difficulty === 24 ? "w-12 h-12" : "w-20 h-20"
                }`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="flex items-center justify-center text-2xl">
                  {card.isFlipped || card.isMatched ? card.symbol : "?"}
                </div>
              </div>
            ))}
          </div>

          <div>
            {message && (
              <p
                className={`text-xl font-bold ${
                  message.includes("Lost") ? "text-red-500 " : "text-green-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          <button
            onClick={resetGame}
            className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 hover:scale-105"
          >
            Reset Game
          </button>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default MemoryMatch;
