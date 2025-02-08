import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  quiz_backend_API,
  attendance_backend_API,
  sign_language_backend_API,
  question_generator_API,
} from "../Config/Config";

import HomePoster from "../Assets/HomePage/HomePoster.png";

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

const HomePage = () => {
  const navigate = useNavigate();

  const handleShortcutsNavigation = (scrollValue) => {
    navigate("/shortcuts", { state: { scrollTo: { y: scrollValue } } });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 bg-[#e9f3fd] py-6">
        <h1 className="font-bold text-center text-3xl md:text-4xl lg:text-7xl text-[#1d2b46]">
          <span className="bg-bluegradientR bg-clip-text text-transparent mr-2 lg:mr-4">
            Learn
          </span>
          Anything, Anytime, Anywhere
        </h1>
        <p className="text-[#1d2b46] font-semibold text-center mx-8 md:mx-12 lg:mx-auto">
          Access high-quality courses from expert instructors and join a
          community of lifelong learners.
        </p>
        <div className="mx-auto w-[300px] lg:w-[560px]">
          <img src={HomePoster} alt="home poster" className="w-full" />
        </div>
        <div className="flex items-center gap-10">
          <Link to={"/signup"}>
            <button className="bg-bluegradientR hover:scale-105 text-white font-semibold mx-auto my-4 w-fit px-4 py-3 border-none outline-none rounded-[36px]">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <div className="m-10">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          What we offer
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-8">
          <Link to={"/self-paced-courses"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img
                  src={SelfPacedCoursesLogo}
                  alt="image"
                  className="w-full"
                />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Self Paced Courses
              </h1>
            </div>
          </Link>
          <Link to={"/e-library"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={DigitalLibraryLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Digital Library
              </h1>
            </div>
          </Link>
          <Link to={"/games"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={GameLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Gamified Learning
              </h1>
            </div>
          </Link>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/28/10/20250128103655-FIOLFGT8.json"
          >
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={AIDoubtSolverLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                AI Doubt Solver
              </h1>
            </div>
          </a>
          <a
            href={`${attendance_backend_API}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img
                  src={AttendanceSystemLogo}
                  alt="image"
                  className="w-full"
                />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Digital Attendance System
              </h1>
            </div>
          </a>
          <Link to={"/live-classes"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={LiveClassesLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Live Classes
              </h1>
            </div>
          </Link>
          <a
            target="_blank"
            rel="noreferrer"
            href={`${question_generator_API}`}
          >
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={ExamPreparationLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Exam Preparation Assistance
              </h1>
            </div>
          </a>

          <Link to={"/score-analysis"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={ScoreAnalysisLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Score Analysis
              </h1>
            </div>
          </Link>
          <Link to={"/cgpa-calculator"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={CGPACalculatorLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                CGPA Calculator
              </h1>
            </div>
          </Link>
          <Link to={"/download-website"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={OfflineLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Offline Access
              </h1>
            </div>
          </Link>
        </div>
      </div>
      <div className="m-10 my-16">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Adaptive Learning Platform
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <Link to={"/dashboard"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={DashboardLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Personalized Dashboard
              </h1>
            </div>
          </Link>
          <Link to={"/quiz"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={QuizLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Test your Strengths and Weaknesses
              </h1>
            </div>
          </Link>
          <a href={`${quiz_backend_API}`} target="_blank" rel="noreferrer">
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img
                  src={QuizScoreAnalyzerLogo}
                  alt="image"
                  className="w-full"
                />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Quiz Score Analyzer
              </h1>
            </div>
          </a>
          <Link to={"/time-management"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={TimeManagementLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Personalized Time Management
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div className="m-10 my-16">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Special Education for Disabled Students
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <a
            href={`${sign_language_backend_API}/alphabets`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={AlphabetsLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Learn Sign Language (Alphabets)
              </h1>
            </div>
          </a>
          <a
            href={`${sign_language_backend_API}/numbers`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={NumbersLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Learn Sign Language (Numbers)
              </h1>
            </div>
          </a>
          <Link to={"/digital-orbit-writer"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={OrbitWriterLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Digital Orbit Writer (Blind Assistance)
              </h1>
            </div>
          </Link>
          <Link to={"/voice-to-text"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={VoiceToTextLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Voice To Text
              </h1>
            </div>
          </Link>
          <div
            onClick={() => {
              handleShortcutsNavigation(100);
            }}
            className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center"
          >
            <div className="w-[100px] h-[100px]">
              <img src={CursorLogo} alt="image" className="w-full" />
            </div>
            <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
              Smart Cursor Navigation
            </h1>
          </div>
          <div
            onClick={() => {
              handleShortcutsNavigation(700);
            }}
            className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center"
          >
            <div className="w-[100px] h-[100px]">
              <img src={ScreenReaderLogo} alt="image" className="w-full" />
            </div>
            <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
              Screen Reader
            </h1>
          </div>
        </div>
      </div>
      <div className="m-10 my-16">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Special Exercises for Neurodivergent Students
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] lg:grid-cols-[repeat(auto-fit,_minmax(425px,_1fr))] gap-8">
          <Link to={"/games/sudoku"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={SudokuLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Brain Strategical Exercise (Sudoku)
              </h1>
            </div>
          </Link>
          <Link to={"/games/memory-match"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={MemoryMatchLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Visual Exercise (Memory Match)
              </h1>
            </div>
          </Link>
          <Link to={"/games/maze"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={SolveMazeLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Brain Strategical Exercise (Maze)
              </h1>
            </div>
          </Link>
          <Link to={"/games/bingo"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={BingoLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Brain Strategical Exercise (Bingo)
              </h1>
            </div>
          </Link>
          <Link to={"/games/words-color-match"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={WordsColorMatchLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Visual Exercise (Words Color Match)
              </h1>
            </div>
          </Link>
          <Link to={"/games/voice-match"}>
            <div className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center">
              <div className="w-[100px] h-[100px]">
                <img src={VoiceMatchLogo} alt="image" className="w-full" />
              </div>
              <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
                Auditory Exercise (Voice Match)
              </h1>
            </div>
          </Link>
          <div
            onClick={() => {
              handleShortcutsNavigation(1200);
            }}
            className="bg-[#f2f8ff] min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-[#f2f8ff] border-[2px] shadow-lg shadow-[#4A9DFF]/40 flex flex-col items-center justify-center"
          >
            <div className="w-[100px] h-[100px]">
              <img src={ScreenMagnifierLogo} alt="image" className="w-full" />
            </div>
            <h1 className="text-xl md:text-2xl text-center font-bold my-4 mx-4">
              Screen Magnifier
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
