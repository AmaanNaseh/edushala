import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { backend_API } from "../Config/Config";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashbordPage = () => {
  const [sudokuData, setSudokuData] = useState([]);
  const [cardMemoryData, setCardMemoryData] = useState([]);
  const [quizData, setQuizData] = useState({
    science: [],
    math: [],
    english: [],
  });

  const [user, setUser] = useState({});

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${backend_API}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const getSudokuData = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/sudoku`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSudokuData(response.data.allTries);
      console.log("Fetched Sudoku Data:", response.data.allTries);
    } catch (error) {
      console.error(
        "Error fetching Sudoku data:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch Sudoku data.");
    }
  };

  const getCardMemoryData = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/cardmemory`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCardMemoryData(response.data.allTries);
      console.log("Fetched Memory Match Data:", response.data.allTries);
    } catch (error) {
      console.error(
        "Error fetching Memory Match data:",
        error.response?.data || error.message
      );
      toast.error("Failed to fetch Memory Match data.");
    }
  };

  const getQuizData = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/quiz/results`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const quizResults = response.data.quizResults;

      const scienceData = quizResults.filter(
        (item) => item.subject === "science"
      );
      const mathData = quizResults.filter((item) => item.subject === "maths");
      const englishData = quizResults.filter(
        (item) => item.subject === "english"
      );

      setQuizData({
        science: scienceData,
        math: mathData,
        english: englishData,
      });
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
    }
  };

  useEffect(() => {
    getSudokuData();
  }, []);

  useEffect(() => {
    getCardMemoryData();
  }, []);

  useEffect(() => {
    getQuizData();
  }, []);

  const processData = (data) => {
    const easy = [];
    const medium = [];
    const hard = [];
    const easyMeta = [];
    const mediumMeta = [];
    const hardMeta = [];

    data.forEach((item, index) => {
      if (item.level === "Easy") {
        easy.push(item.completionTime);
        easyMeta.push(item);
      } else if (item.level === "Medium") {
        medium.push(item.completionTime);
        mediumMeta.push(item);
      } else if (item.level === "Hard") {
        hard.push(item.completionTime);
        hardMeta.push(item);
      }
    });

    return {
      easy,
      medium,
      hard,
      easyMeta,
      mediumMeta,
      hardMeta,
    };
  };

  const getChartData = (data, title) => {
    const { easy, medium, hard, easyMeta, mediumMeta, hardMeta } =
      processData(data);

    return {
      labels: Array.from(
        { length: Math.max(easy.length, medium.length, hard.length) },
        (_, i) => i + 1
      ), // Dynamic x-axis labels
      datasets: [
        {
          label: `Easy (${title})`,
          data: easy,
          fill: false,
          borderColor: "green",
          tension: 0.1,
          metaData: easyMeta,
        },
        {
          label: `Medium (${title})`,
          data: medium,
          fill: false,
          borderColor: "orange",
          tension: 0.1,
          metaData: mediumMeta,
        },
        {
          label: `Hard (${title})`,
          data: hard,
          fill: false,
          borderColor: "red",
          tension: 0.1,
          metaData: hardMeta,
        },
      ],
    };
  };

  const getQuizChartData = (data, subject) => {
    const scores = data.map((item) => item.score);
    const createdAt = data.map((item) => item.createdAt);
    const tries = data.map((_, index) => index + 1); // Dynamic x-axis (tries)

    return {
      labels: tries,
      datasets: [
        {
          label: `${subject} Quiz`,
          data: scores,
          fill: false,
          borderColor: "blue",
          tension: 0.1,
          metaData: createdAt, // Attached createdAt as metaData
        },
      ],
    };
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const metaData = dataset.metaData[index];

            const time = tooltipItem.raw; // completionTime
            const createdAt = new Date(metaData.createdAt).toLocaleString(); // Format createdAt
            return `Completion Time: ${time} seconds, Created At: ${createdAt}`;
          },
        },
      },
    },
  };

  const QuizOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          // Custom tooltip callback
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const index = tooltipItem.dataIndex;
            const createdAt = new Date(
              dataset.metaData[index]
            ).toLocaleString(); // Format createdAt
            const score = tooltipItem.raw; // Quiz score
            return `Score: ${score}, Created At: ${createdAt}`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-[100vh] m-2 p-4 md:m-4 md:p-8 lg:m-10 lg:p-10 bg-bluegradientR">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl text-white text-center my-4 md:my-7">
        {user.userFullName}'s Dashboard
      </h1>

      <div className="flex flex-wrap gap-8 items-center justify-evenly my-10">
        <div className="flex flex-col items-center justify-center gap-4 bg-white">
          <h3 className="font-bold text-2xl">Sudoku</h3>
          <div className="flex flex-row flex-wrap gap-8">
            <div className="min-w-[200px] min-h-[175px] lg:min-w-[400px] lg:min-h-[225px]">
              <Line
                data={getChartData(sudokuData, "Sudoku")}
                options={options}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 bg-white">
          <h3 className="font-bold text-2xl">Memory Match Game</h3>
          <div className="flex flex-row flex-wrap gap-8">
            <div className="min-w-[200px] min-h-[175px] lg:min-w-[400px] lg:min-h-[225px]">
              <Line
                data={getChartData(cardMemoryData, "Memory Match")}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 items-center justify-evenly my-10">
        <div className="flex flex-col items-center justify-center gap-4 bg-white">
          <h3 className="font-bold text-2xl">Science Quiz</h3>
          <div className="min-w-[200px] min-h-[175px] lg:min-w-[400px] lg:min-h-[225px]">
            <Line
              data={getQuizChartData(quizData.science, "Science")}
              options={QuizOptions}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 bg-white">
          <h3 className="font-bold text-2xl">Math Quiz</h3>
          <div className="min-w-[200px] min-h-[175px] lg:min-w-[400px] lg:min-h-[225px]">
            <Line
              data={getQuizChartData(quizData.math, "Math")}
              options={QuizOptions}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 bg-white">
          <h3 className="font-bold text-2xl">English Quiz</h3>
          <div className="min-w-[200px] min-h-[175px] lg:min-w-[400px] lg:min-h-[225px]">
            <Line
              data={getQuizChartData(quizData.english, "English")}
              options={QuizOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordPage;
