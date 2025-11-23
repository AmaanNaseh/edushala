import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  quiz_backend_API,
  attendance_backend_API,
  sign_language_backend_API,
  question_generator_API,
} from "../Config/Config";

import AttendanceSystemLogo from "../Assets/HomePage/AttendanceSystem.png";
import LiveClassesLogo from "../Assets/HomePage/LiveClasses.png";
import SelfPacedCoursesLogo from "../Assets/HomePage/SelfPacedCourses.png";
import AIDoubtSolverLogo from "../Assets/HomePage/AIDoubtSolver.png";
import ExamPreparationLogo from "../Assets/HomePage/ExamPreparation.png";
import GameLogo from "../Assets/HomePage/GamifiedLearning.png";
import DigitalLibraryLogo from "../Assets/HomePage/DigitalLibrary.png";
import ScoreAnalysisLogo from "../Assets/HomePage/ScoreAnalysis.png";
import CGPACalculatorLogo from "../Assets/HomePage/CGPACalculator.png";
import OfflineLogo from "../Assets/HomePage/Offline.png";

import DashboardLogo from "../Assets/HomePage/Dashboard.png";
import QuizLogo from "../Assets/HomePage/Quiz.png";
import QuizScoreAnalyzerLogo from "../Assets/HomePage/QuizScoreAnalyzer.png";
import TimeManagementLogo from "../Assets/HomePage/TimeManagement.png";

import AlphabetsLogo from "../Assets/HomePage/Alphabets.png";
import NumbersLogo from "../Assets/HomePage/Numbers.png";
import OrbitWriterLogo from "../Assets/HomePage/OrbitWriter.png";

import VoiceToTextLogo from "../Assets/HomePage/VoiceToText.png";
import ScreenReaderLogo from "../Assets/HomePage/ScreenReader.png";
import ScreenMagnifierLogo from "../Assets/HomePage/ScreenMagnifier.png";
import CursorLogo from "../Assets/HomePage/Cursor.png";

import BingoLogo from "../Assets/HomePage/Bingo.png";
import MemoryMatchLogo from "../Assets/HomePage/MemoryMatch.png";
import WordsColorMatchLogo from "../Assets/HomePage/WordsColorMatch.png";
import VoiceMatchLogo from "../Assets/HomePage/VoiceMatch.png";
import SolveMazeLogo from "../Assets/HomePage/SolveMaze.png";
import SudokuLogo from "../Assets/HomePage/Sudoku.png";
import { HeroSection } from "../Components/HeroSection/HeroSection";

// --------------------------------------
// REUSABLE CARD COMPONENT
// --------------------------------------
const Card = ({ img, title, isDarkMode, onClick, link, external }) => {
  const cardContent = (
    <div
      onClick={onClick}
      className={`group min-h-[240px] rounded-2xl p-6 cursor-pointer 
        flex flex-col items-center justify-center text-center
        transition-all duration-300
        ${
          isDarkMode
            ? "bg-[#1b4f9b] border border-white/20 shadow-md shadow-white/10 hover:shadow-xl hover:shadow-white/20"
            : "bg-white border border-gray-200 shadow-md shadow-blue-100/40 hover:shadow-2xl hover:shadow-blue-200/60"
        }
        hover:-translate-y-2`}
    >
      <div
        className="w-[90px] h-[90px] rounded-xl bg-white/40 backdrop-blur-md shadow-inner 
          flex items-center justify-center transition-all duration-300 group-hover:scale-110"
      >
        <img src={img} alt="icon" className="w-[70%] h-[70%] object-contain" />
      </div>

      <h1
        className="text-lg md:text-xl font-semibold mt-6 
          group-hover:text-blue-600 transition-colors duration-300"
      >
        {title}
      </h1>
    </div>
  );

  if (link) {
    return external ? (
      <a href={link} target="_blank" rel="noreferrer">
        {cardContent}
      </a>
    ) : (
      <Link to={link}>{cardContent}</Link>
    );
  }

  return cardContent;
};

const HomePage = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const handleShortcutsNavigation = (scrollValue) => {
    navigate("/shortcuts", { state: { scrollTo: { y: scrollValue } } });
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection isDarkMode={isDarkMode} />

      {/* What We Offer */}
      <div className="m-10 my-16 md:mt-32">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          What we offer
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8">
          <Card
            img={SelfPacedCoursesLogo}
            title="Self Paced Courses"
            link="/self-paced-courses"
            isDarkMode={isDarkMode}
          />
          <Card
            img={DigitalLibraryLogo}
            title="Digital Library"
            link="/e-library"
            isDarkMode={isDarkMode}
          />
          <Card
            img={GameLogo}
            title="Gamified Learning"
            link="/games"
            isDarkMode={isDarkMode}
          />

          <Card
            img={AIDoubtSolverLogo}
            title="AI Doubt Solver"
            link="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/28/10/20250128103655-FIOLFGT8.json"
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={AttendanceSystemLogo}
            title="Digital Attendance System"
            link={attendance_backend_API}
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={LiveClassesLogo}
            title="Live Classes"
            link="/live-classes"
            isDarkMode={isDarkMode}
          />

          <Card
            img={ExamPreparationLogo}
            title="Exam Preparation Assistance"
            link={question_generator_API}
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={ScoreAnalysisLogo}
            title="Score Analysis"
            link="/score-analysis"
            isDarkMode={isDarkMode}
          />
          <Card
            img={CGPACalculatorLogo}
            title="CGPA Calculator"
            link="/cgpa-calculator"
            isDarkMode={isDarkMode}
          />
          <Card
            img={OfflineLogo}
            title="Offline Access"
            link="/download-website"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Adaptive Learning */}
      <div className="m-10 my-16 md:mt-32">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Adaptive Learning Platform
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <Card
            img={DashboardLogo}
            title="Personalized Dashboard"
            link="/dashboard"
            isDarkMode={isDarkMode}
          />
          <Card
            img={QuizLogo}
            title="Test your Strengths and Weaknesses"
            link="/quiz"
            isDarkMode={isDarkMode}
          />

          <Card
            img={QuizScoreAnalyzerLogo}
            title="Quiz Score Analyzer"
            link={quiz_backend_API}
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={TimeManagementLogo}
            title="Personalized Time Management"
            link="/time-management"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Special Education */}
      <div className="m-10 my-16 md:mt-32">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Special Education for Disabled Students
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <Card
            img={AlphabetsLogo}
            title="Learn Sign Language (Alphabets)"
            link={`${sign_language_backend_API}/alphabets`}
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={NumbersLogo}
            title="Learn Sign Language (Numbers)"
            link={`${sign_language_backend_API}/numbers`}
            external
            isDarkMode={isDarkMode}
          />

          <Card
            img={OrbitWriterLogo}
            title="Digital Orbit Writer (Blind Assistance)"
            link="/digital-orbit-writer"
            isDarkMode={isDarkMode}
          />
          <Card
            img={VoiceToTextLogo}
            title="Voice To Text"
            link="/voice-to-text"
            isDarkMode={isDarkMode}
          />

          <Card
            img={CursorLogo}
            title="Smart Cursor Navigation"
            isDarkMode={isDarkMode}
            onClick={() => handleShortcutsNavigation(100)}
          />

          <Card
            img={ScreenReaderLogo}
            title="Screen Reader"
            isDarkMode={isDarkMode}
            onClick={() => handleShortcutsNavigation(700)}
          />
        </div>
      </div>

      {/* Neurodivergent Exercises */}
      <div className="m-10 my-16 md:mt-32">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Special Exercises for Neurodivergent Students
        </h1>

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <Card
            img={SudokuLogo}
            title="Brain Strategical Exercise (Sudoku)"
            link="/games/sudoku"
            isDarkMode={isDarkMode}
          />
          <Card
            img={MemoryMatchLogo}
            title="Visual Exercise (Memory Match)"
            link="/games/memory-match"
            isDarkMode={isDarkMode}
          />
          <Card
            img={SolveMazeLogo}
            title="Brain Strategical Exercise (Maze)"
            link="/games/maze"
            isDarkMode={isDarkMode}
          />
          <Card
            img={BingoLogo}
            title="Brain Strategical Exercise (Bingo)"
            link="/games/bingo"
            isDarkMode={isDarkMode}
          />
          <Card
            img={WordsColorMatchLogo}
            title="Visual Exercise (Words Color Match)"
            link="/games/words-color-match"
            isDarkMode={isDarkMode}
          />
          <Card
            img={VoiceMatchLogo}
            title="Auditory Exercise (Voice Match)"
            link="/games/voice-match"
            isDarkMode={isDarkMode}
          />

          <Card
            img={ScreenMagnifierLogo}
            title="Screen Magnifier"
            isDarkMode={isDarkMode}
            onClick={() => handleShortcutsNavigation(1200)}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
