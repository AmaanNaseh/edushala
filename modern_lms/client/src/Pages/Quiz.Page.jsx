import React, { useState, useEffect } from "react";
import { EnglishQuizDataset } from "../Datasets/EnglishQuizDataset";
import { MathsQuizDataset } from "../Datasets/MathsQuizDataset";
import { ScienceQuizDataset } from "../Datasets/ScienceQuizDataset";
import { backend_API } from "../Config/Config";

import axios from "axios";

const QuizPage = () => {
  const [subject, setSubject] = useState("english"); // Default subject
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const datasets = {
    english: EnglishQuizDataset,
    maths: MathsQuizDataset,
    science: ScienceQuizDataset,
  };
  const questions = datasets[subject];

  useEffect(() => {
    if (!isQuizComplete) {
      const currentOptions = questions[currentQuestionIndex]?.options;
      if (currentOptions) {
        const shuffled = Object.entries(currentOptions)
          .map(([key, value]) => ({ key, value }))
          .sort(() => Math.random() - 0.5);
        setShuffledOptions(shuffled);
      }
    }
  }, [currentQuestionIndex, subject, isQuizComplete]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
  };

  const handleOptionClick = (isCorrect) => {
    setScore((prevScore) => {
      const updatedScore = isCorrect ? prevScore + 4 : prevScore - 1;
      return Math.max(0, Math.min(updatedScore, 100));
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const saveQuizResult = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `${backend_API}/api/quiz/add`,
        { subject, score },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Quiz result saved successfully!");
    } catch (error) {
      console.error("Error saving quiz result:", error.message);
      alert("Failed to save quiz result");
    }
  };

  useEffect(() => {
    if (isQuizComplete) {
      saveQuizResult();
    }
  }, [isQuizComplete]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        Test your Knowledge
      </h1>

      <div className="flex flex-wrap justify-center items-center">
        <label className="mr-4 text-lg font-semibold">Choose Subject:</label>
        <select
          value={subject}
          onChange={handleSubjectChange}
          className="px-4 py-2 border-[2px] border-black font-semibold"
        >
          <option value="english">English</option>
          <option value="maths">Maths</option>
          <option value="science">Science</option>
        </select>
      </div>

      {!isQuizComplete ? (
        <div className="p-6 rounded-lg border-[2px] border-black/50 shadow-md shadow-black/50 space-y-4 w-fit mx-auto">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <p className="text-lg font-medium">
            {questions[currentQuestionIndex].question}
          </p>
          <div className="flex flex-col space-y-2">
            {shuffledOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleOptionClick(option.key === "right")}
                className="p-2 border rounded hover:bg-blue-500 hover:text-white"
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-8 py-12 rounded-lg border-[2px] border-black/50 shadow-md shadow-black/50 space-y-4 w-fit mx-auto">
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="text-xl flex items-center justify-center">
            <span className="font-semibold mr-4">Subject:</span>{" "}
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </p>
          <p className="text-xl flex items-center justify-center">
            <span className="font-semibold mr-4">Your Score:</span> {score}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
