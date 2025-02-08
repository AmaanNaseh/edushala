import React, { useEffect, useState } from "react";
import {
  attendance_backend_API,
  quiz_backend_API,
  sign_language_backend_API,
  question_generator_API,
} from "../../Config/Config";

import { FaUserGraduate } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { FaMobile } from "react-icons/fa6";
import { FaLaptop } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import Brochure from "../../Assets/BrochurePage/Brochure.pdf";

const Navbar = ({
  isCursorActive,
  setIsCursorActive,
  isListening,
  setIsListening,
  synth,
  speakPageContent,
  synthActive,
  setSynthActive,
  isVisible,
  setIsVisible,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideNav, setIsSideNav] = useState(false);
  const [isFeaturesHover, setIsFeaturesHover] = useState(false);
  const [isFeatures, setIsFeatures] = useState(false);

  const navigate = useNavigate();

  const handleShortcutsNavigation = (scrollValue) => {
    navigate("/shortcuts", { state: { scrollTo: { y: scrollValue } } });
  };

  const handleDownloadsNavigation = (scrollValue) => {
    navigate("/download-website", { state: { scrollTo: { y: scrollValue } } });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const role = localStorage.getItem("role");

  return (
    <>
      <nav
        className={`flex items-center justify-between gap-10 p-4 shadow-md shadow-black/50 text-white bg-[#1674c9] sticky top-0 left-0 w-[100%] z-30 ${
          isScrolled ? "rounded-full top-[6px] w-[98%] mx-auto" : ""
        }`}
      >
        <div className="flex gap-16">
          <Link className="hover:scale-105" to={"/"}>
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-3xl" />
              <h3 className="text-2xl font-bold">EduShala</h3>
            </div>
          </Link>
          <ul className="hidden lg:inline-flex gap-4 items-center text-lg font-semibold ">
            <li
              onMouseEnter={() => setIsFeaturesHover(true)}
              onMouseLeave={() => setIsFeaturesHover(false)}
              onClick={() => {
                setIsFeatures(!isFeatures);
              }}
              className="hover:cursor-pointer hover:scale-105"
            >
              Features
            </li>
            <Link to={"/shortcuts"}>
              <li className="hover:scale-105">Shortcuts</li>
            </Link>
            <a href={Brochure} download>
              <li className="hover:scale-105">Brochure</li>
            </a>
            <Link to={"/about"}>
              <li className="hover:scale-105">About</li>
            </Link>
          </ul>
        </div>

        {isFeaturesHover || isFeatures ? (
          <div className="hidden lg:flex flex-row fixed top-[80px] left-0 right-0 z-20 bg-[#ffffff] shadow-lg shadow-black/50 text-black">
            <div className="p-8 flex flex-wrap gap-8 items-start w-[80%]">
              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Core Features</li>

                <Link to={"/self-paced-courses"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Self paced courses
                  </li>
                </Link>
                <Link to={"/e-library"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Digital Library
                  </li>
                </Link>
                <Link to={"live-classes"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Live Classes
                  </li>
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${question_generator_API}`}
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Exam Preparation
                  </li>
                </a>
                <Link to={"/score-analysis"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Score Analysis
                  </li>
                </Link>
                <Link to={"/cgpa-calculator"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    CGPA Calculator
                  </li>
                </Link>
              </ul>
              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">AI Features</li>
                <a
                  href={`${attendance_backend_API}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Digital Attendance System
                  </li>
                </a>
                <a
                  href={`${sign_language_backend_API}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Sign Language Tutorials
                  </li>
                </a>
                <a
                  href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/28/10/20250128103655-FIOLFGT8.json"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    AI Doubt Solver
                  </li>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${question_generator_API}`}
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    AI Question Generator
                  </li>
                </a>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Adaptive Learning</li>
                <Link to={"/dashboard"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Dashboard
                  </li>
                </Link>
                <Link to={"/quiz"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Quiz
                  </li>
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${quiz_backend_API}`}
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Quiz Score Analyzer
                  </li>
                </a>
                <Link to={"/time-management"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Time Management System
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Special Education</li>
                <a
                  href={`${sign_language_backend_API}/alphabets`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Sign Language Alphabets
                  </li>
                </a>
                <a
                  href={`${sign_language_backend_API}/numbers`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Sign Language Numbers
                  </li>
                </a>
                <Link to={"/digital-orbit-writer"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Digital Orbit Writer
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Gamified Learning</li>
                <Link to={"/games/bingo"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Bingo
                  </li>
                </Link>
                <Link to={"/games/sudoku"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Sudoku
                  </li>
                </Link>
                <Link to={"/games/maze"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Maze
                  </li>
                </Link>
                <Link to={"/games/memory-match"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Memory Match
                  </li>
                </Link>
                <Link to={"/games/words-color-match"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Words Color Match
                  </li>
                </Link>
                <Link to={"/games/voice-match"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Voice Match
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">
                  Accessibility & Shortcuts
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(100);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black"
                >
                  Keyboard Cursor
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(100);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black"
                >
                  Voice Cursor
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(700);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black"
                >
                  Screen Reader
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(1200);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black"
                >
                  Screen Magnifier
                </li>
                <Link to={"/voice-to-text"}>
                  <li className="hover:scale-[1.02] hover:cursor-pointer hover:border-b-[1px] border-black">
                    Voice to Text
                  </li>
                </Link>
              </ul>
            </div>

            <div className="m-8 rounded-[20px] bg-gradient-to-b from-black to-white text-white border-[1px] border-gray-100 shadow-lg shadow-black/40 w-[20%] p-8">
              <h3 className="font-bold text-lg text-center">
                Offline Installation
              </h3>
              <ul className="list-none flex flex-col items-start justify-center gap-4 my-8">
                <li
                  onClick={() => {
                    handleDownloadsNavigation(450);
                  }}
                  className="flex items-center justify-center gap-2 font-semibold p-4 border-black border-[2px] hover:border-[3px] hover:bg-white hover:text-black cursor-pointer"
                >
                  Mobile
                  <span className="text-3xl ml-[29px]">
                    <FaMobile />
                  </span>
                </li>
                <li
                  onClick={() => {
                    handleDownloadsNavigation(100);
                  }}
                  className="flex items-center justify-center gap-2 font-semibold p-4 border-black border-[2px] hover:border-[3px] hover:bg-white hover:text-black cursor-pointer"
                >
                  Desktop
                  <span className="text-3xl ml-4">
                    <FaLaptop />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="gap-4 items-center justify-center hidden lg:flex">
          <Link to={"/profile"}>
            <button className="bg-bluegradientR hover:scale-105 text-white font-semibold w-fit px-4 py-3 border-none outline-none rounded-[36px]">
              Profile
            </button>
          </Link>
          <div
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.reload();
            }}
            className=" rounded-full p-2 hover:cursor-pointer hover:scale-105 hover:bg-red-500"
          >
            <MdLogout className="text-2xl" />
          </div>
        </div>

        {isSideNav ? (
          <ul className="bg-[#1674c9] fixed top-[60px] right-0 bottom-0 z-20 px-8 py-4 flex flex-col items-center gap-4 lg:hidden">
            <Link to={"/profile"}>
              <li>
                <button className=" bg-bluegradientR text-white font-semibold w-fit px-4 py-3 border-none outline-none rounded-[36px]">
                  Profile
                </button>
              </li>
            </Link>
            <ul className="flex flex-col items-center justify-center my-4 gap-4 font-semibold">
              <Link to={"/shortcuts"}>
                <li className="hover:scale-105">Shortcuts</li>
              </Link>
              <a href={Brochure} download>
                <li className="hover:scale-105">Brochure</li>
              </a>
              <Link to={"/about"}>
                <li className="hover:scale-105">About</li>
              </Link>
              <li
                onClick={() => {
                  setIsVisible(!isVisible);
                }}
                className="hover:scale-105"
              >
                Magnifier
              </li>
              <li
                onClick={() => {
                  setSynthActive(!synthActive);
                  speakPageContent();
                  if (synthActive === false) {
                    synth.current.cancel();
                    const utterance = new SpeechSynthesisUtterance("Stopped");
                    synth.current.speak(utterance);
                  }
                }}
                className="hover:scale-105"
              >
                Screen Reader
              </li>
              <li
                onClick={() => {
                  setIsCursorActive(!isCursorActive);
                }}
                className="hover:scale-105"
              >
                Keyboard Cursor
              </li>
              <li
                onClick={() => {
                  setIsListening(!isListening);
                }}
                className="hover:scale-105"
              >
                Voice Cursor
              </li>
            </ul>
            <div
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.reload();
              }}
              className=" rounded-full p-2 hover:cursor-pointer hover:scale-105 hover:bg-red-500"
            >
              <MdLogout className="text-2xl" />
            </div>
          </ul>
        ) : (
          ""
        )}

        <GiHamburgerMenu
          onClick={() => {
            setIsSideNav(!isSideNav);
          }}
          className="lg:hidden text-3xl cursor-pointer"
        />
      </nav>
    </>
  );
};

export default Navbar;
