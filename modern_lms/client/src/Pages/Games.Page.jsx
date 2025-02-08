import React, { useState } from "react";
import Bingo from "./Games/Bingo";
import Sudoku from "./Games/Sudoku";
import MemoryMatch from "./Games/MemoryMatch";
import WordsColorMatch from "./Games/WordsColorMatch";
import VoiceMatch from "./Games/VoiceMatch";
import SolveMaze from "./Games/SolveMaze";
import BingoLogo from "../Assets/HomePage/Bingo.png";
import MemoryMatchLogo from "../Assets/HomePage/MemoryMatch.png";
import WordsColorMatchLogo from "../Assets/HomePage/WordsColorMatch.png";
import VoiceMatchLogo from "../Assets/HomePage/VoiceMatch.png";
import SolveMazeLogo from "../Assets/HomePage/SolveMaze.png";
import SudokuLogo from "../Assets/HomePage/Sudoku.png";

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const gameNames = [
    { name: "Bingo", component: <Bingo />, logo: BingoLogo },
    {
      name: "Sudoku",
      component: <Sudoku />,
      logo: SudokuLogo,
    },
    { name: "Maze", component: <SolveMaze />, logo: SolveMazeLogo },
    {
      name: "Memory Match",
      component: <MemoryMatch />,
      logo: MemoryMatchLogo,
    },
    {
      name: "Words Color Match",
      component: <WordsColorMatch />,
      logo: WordsColorMatchLogo,
    },
    {
      name: "Voice Match",
      component: <VoiceMatch />,
      logo: VoiceMatchLogo,
    },
  ];

  return (
    <div className="bg-black min-h-[100vh]">
      <div className="flex flex-col items-center justify-center gap-12 py-10 mx-4">
        {/* Game Name List */}
        <div className="flex flex-col md:flex-row flex-wrap items-center gap-8">
          {gameNames.map((game, index) => (
            <button
              key={index}
              onClick={() => setSelectedGame(game.component)}
              className="flex items-center justify-center gap-4 min-w-[315px] min-h-[120px] text-lg bg-white font-semibold p-2 rounded hover:bg-blue-500"
            >
              <div>{game.name}</div>
              <div className="w-[100px]">
                <img src={game.logo} alt={game.name} className="w-full" />
              </div>
            </button>
          ))}
        </div>

        {/* Game Area */}
        <div className="p-2 border-4 border-black rounded-md bg-white">
          {selectedGame ? (
            selectedGame
          ) : (
            <div className="text-center font-bold">Select a game to play</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
