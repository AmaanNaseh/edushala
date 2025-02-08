import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { backend_API } from "../Config/Config";

ChartJS.register(ArcElement, Tooltip, Legend);

const TimeManagementPage = () => {
  const [quizData, setQuizData] = useState({
    english: 0,
    math: 0,
    science: 0,
  });

  const [studyHours, setStudyHours] = useState(0);
  const [studyDistribution, setStudyDistribution] = useState({
    english: 0,
    math: 0,
    science: 0,
  });
  const [submittedHours, setSubmittedHours] = useState(false);

  const getLatestScores = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/quiz/results`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const quizResults = response.data.quizResults;

      const englishData = quizResults.filter(
        (item) => item.subject === "english"
      );
      const mathData = quizResults.filter((item) => item.subject === "maths");
      const scienceData = quizResults.filter(
        (item) => item.subject === "science"
      );

      const latestEnglishScore =
        englishData[englishData.length - 1]?.score || 0;
      const latestMathScore = mathData[mathData.length - 1]?.score || 0;
      const latestScienceScore =
        scienceData[scienceData.length - 1]?.score || 0;

      setQuizData({
        english: latestEnglishScore,
        math: latestMathScore,
        science: latestScienceScore,
      });
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
    }
  };

  const calculateStudyDistribution = () => {
    const scores = [
      { subject: "english", score: quizData.english },
      { subject: "math", score: quizData.math },
      { subject: "science", score: quizData.science },
    ];

    const sortedScores = [...scores].sort((a, b) => a.score - b.score);

    const lowestScore = sortedScores[0];
    const middleScore = sortedScores[1];
    const highestScore = sortedScores[2];

    const totalStudyHours = studyHours;

    const englishTime = lowestScore.score > 0 ? totalStudyHours * 0.5 : 0; // 50% for lowest score
    const mathTime = middleScore.score > 0 ? totalStudyHours * 0.3 : 0; // 30% for middle score
    const scienceTime = highestScore.score > 0 ? totalStudyHours * 0.2 : 0; // 20% for highest score

    setStudyDistribution({
      [lowestScore.subject]: englishTime,
      [middleScore.subject]: mathTime,
      [highestScore.subject]: scienceTime,
    });
  };

  const handleStudyHoursChange = (e) => {
    const value = Math.min(12, Math.max(0, e.target.value));
    setStudyHours(value);
  };

  const handleSubmit = () => {
    if (studyHours >= 0 && studyHours <= 12) {
      calculateStudyDistribution();
      setSubmittedHours(true);
    } else {
      alert("Please enter a valid number of hours between 0 and 12.");
    }
  };

  const pieChartData = {
    labels: ["English", "Math", "Science"],
    datasets: [
      {
        data: [
          studyDistribution.english || 0,
          studyDistribution.math || 0,
          studyDistribution.science || 0,
        ],
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  useEffect(() => {
    getLatestScores();
  }, []);

  return (
    <div className="m-4 md:m-8 lg:m-12 space-y-8 min-h-[75vh]">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        Personalized Time Management System
      </h1>

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-10">
          <label htmlFor="study-hours" className="font-semibold">
            Enter how many hours you wish to study daily (0-12) ?{" "}
          </label>
          <input
            type="number"
            id="study-hours"
            value={studyHours}
            onChange={handleStudyHoursChange}
            min="0"
            max="12"
            className="px-4 py-2 border-[2px] border-black"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-fit mx-auto bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
        >
          Submit Hours
        </button>
      </div>

      {submittedHours && studyHours > 0 && (
        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center mx-auto my-8 border-[2px] border-black p-4 shadow-sm shadow-black/30">
          <Pie data={pieChartData} options={options} />
        </div>
      )}

      {submittedHours && studyHours > 0 && (
        <div className="flex flex-col items-center justify-center mx-auto gap-8">
          <h3 className="font-semibold text-xl">
            Today's study hours distribution:
          </h3>
          <ul className="list-none flex flex-col items-center justify-center gap-4 text-lg">
            <li>
              <span className="font-semibold mr-4">English:</span>{" "}
              {studyDistribution.english.toFixed(2)} hours
            </li>
            <li>
              <span className="font-semibold mr-4">Math:</span>{" "}
              {studyDistribution.math.toFixed(2)} hours
            </li>
            <li>
              <span className="font-semibold mr-4">Science:</span>{" "}
              {studyDistribution.science.toFixed(2)} hours
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TimeManagementPage;
