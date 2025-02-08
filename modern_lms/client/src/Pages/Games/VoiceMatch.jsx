import React, { useState, useEffect } from "react";

import bellSound from "../../Assets/VoiceMatchPage/bell.wav";
import birdsSound from "../../Assets/VoiceMatchPage/birds.wav";
import carHornSound from "../../Assets/VoiceMatchPage/car_horn.wav";
import catSound from "../../Assets/VoiceMatchPage/cat.wav";
import dogSound from "../../Assets/VoiceMatchPage/dog.wav";
import horseSound from "../../Assets/VoiceMatchPage/horse.wav";
import lionSound from "../../Assets/VoiceMatchPage/lion.wav";
import rainSound from "../../Assets/VoiceMatchPage/rain.wav";
import tigerSound from "../../Assets/VoiceMatchPage/tiger.mp3";
import wolfSound from "../../Assets/VoiceMatchPage/wolf.wav";

import bellImg from "../../Assets/VoiceMatchPage/bell.jpg";
import birdsImg from "../../Assets/VoiceMatchPage/birds.jpg";
import carHornImg from "../../Assets/VoiceMatchPage/car_horn.jpg";
import catImg from "../../Assets/VoiceMatchPage/cat.jpg";
import dogImg from "../../Assets/VoiceMatchPage/dog.jpg";
import horseImg from "../../Assets/VoiceMatchPage/horse.jpg";
import lionImg from "../../Assets/VoiceMatchPage/lion.jpg";
import rainImg from "../../Assets/VoiceMatchPage/rain.jpg";
import tigerImg from "../../Assets/VoiceMatchPage/tiger.jpg";
import wolfImg from "../../Assets/VoiceMatchPage/wolf.jpg";

const gameAssets = [
  { sound: bellSound, image: bellImg },
  { sound: birdsSound, image: birdsImg },
  { sound: carHornSound, image: carHornImg },
  { sound: catSound, image: catImg },
  { sound: dogSound, image: dogImg },
  { sound: horseSound, image: horseImg },
  { sound: lionSound, image: lionImg },
  { sound: rainSound, image: rainImg },
  { sound: tigerSound, image: tigerImg },
  { sound: wolfSound, image: wolfImg },
];

const VoiceMatch = () => {
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [options, setOptions] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSoundPlayed, setIsSoundPlayed] = useState(false); // Flag to check if sound is played
  const [isGameStarted, setIsGameStarted] = useState(false);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
    setIsPlaying(true);
    setIsSoundPlayed(true); // Set flag when sound is played
    audio.onended = () => setIsPlaying(false);
  };

  const getRandomAsset = () => {
    // Randomly select one asset from gameAssets
    const randomAsset =
      gameAssets[Math.floor(Math.random() * gameAssets.length)];
    return randomAsset;
  };

  useEffect(() => {
    if (isGameStarted) {
      // Randomly choose the correct image and 3 incorrect images for the level
      const correctAsset = gameAssets[level - 1];
      const randomOptions = [correctAsset]; // Start with the correct asset

      while (randomOptions.length < 4) {
        const randomOption = getRandomAsset();
        if (!randomOptions.includes(randomOption)) {
          randomOptions.push(randomOption);
        }
      }

      // Shuffle the options so that the correct image is not always in the same position
      setOptions(randomOptions.sort(() => Math.random() - 0.5));

      // Play only the sound for the correct level
      if (!isSoundPlayed) {
        playSound(correctAsset.sound);
      }
    }
  }, [level, isGameStarted, isSoundPlayed]); // Add `isSoundPlayed` dependency to avoid re-triggering sound

  const handleStartGame = () => {
    setIsGameStarted(true);
    setLevel(1);
    setIsGameOver(false);
    setShowResult(null);
    setIsSoundPlayed(false); // Reset sound played flag to play sound for the first level
    const initialAsset = gameAssets[0]; // Always start with first level's sound/image
    playSound(initialAsset.sound); // Play the first sound for a random start
  };

  const handleReplay = () => {
    setIsSoundPlayed(false); // Reset flag to hide images before replay
    const currentAsset = gameAssets[level - 1];
    playSound(currentAsset.sound); // Replay the sound for the current level
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
    const currentAsset = gameAssets[level - 1];
    if (image === currentAsset.image) {
      if (level < 10) {
        setLevel(level + 1); // Go to the next level
        setShowResult("Correct! Proceeding to the next level...");
        setIsSoundPlayed(false); // Reset sound played flag to trigger sound for next level
      } else {
        setShowResult("Congratulations! You've completed the game.");
        setIsGameOver(true);
      }
    } else {
      setShowResult("You lost, try again.");
      setIsGameOver(true); // End game when player loses
    }
  };

  const handleReset = () => {
    setLevel(1);
    setIsGameOver(false);
    setShowResult(null);
    setSelectedImage(null);
    setOptions([]);
    setIsSoundPlayed(false); // Reset sound played flag
    setIsGameStarted(false); // Reset game start flag
  };

  return (
    <>
      <div className="p-4 space-y-6 min-h-[85vh]">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          The Voice Match Game
        </h1>

        <div className="flex flex-col items-center space-y-4 p-4">
          {isGameOver ? (
            <div className="flex flex-col items-center justify-center gap-8">
              <h2
                className={`text-xl font-semibold text-center ${
                  showResult.includes("lost")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {showResult === "Congratulations! You've completed the game."
                  ? "You finished the game! Well done!"
                  : showResult}
              </h2>
              <button
                className="py-2 px-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 hover:scale-105"
                onClick={handleReset}
              >
                Restart Game
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {!isGameStarted ? (
                <div>
                  <button
                    className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
                    onClick={handleStartGame}
                  >
                    Start Game
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-center">
                      <button
                        className="bg-yellow-500 text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
                        onClick={handleReplay}
                        disabled={isPlaying || !isSoundPlayed}
                      >
                        Replay Sound
                      </button>
                    </div>

                    {isSoundPlayed && (
                      <div className="grid grid-cols-2 gap-6 md:gap-12 lg:gap-16">
                        {options.map((asset, index) => (
                          <div
                            key={index}
                            className="cursor-pointer w-32 h-32 md:w-52 md:h-52 lg:w-60 lg:h-60 flex items-center justify-center border-[4px] border-black"
                            onClick={() => handleSelectImage(asset.image)}
                          >
                            <img
                              src={asset.image}
                              alt={`Option ${index + 1}`}
                              className="w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {showResult && !isGameOver && (
                      <div className="text-lg text-center font-semibold my-4">
                        <span
                          className={
                            showResult.includes("Correct")
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {showResult}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VoiceMatch;
