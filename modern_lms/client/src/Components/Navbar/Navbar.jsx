import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  attendance_backend_API,
  quiz_backend_API,
  sign_language_backend_API,
  question_generator_API,
} from "../../Config/Config";

import { FaUserGraduate } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMobile } from "react-icons/fa6";
import { FaLaptop } from "react-icons/fa";
import { MdLogout, MdOutlineClose } from "react-icons/md";
import { IoMdArrowDown } from "react-icons/io";

import Brochure from "../../Assets/BrochurePage/Brochure.pdf";
import GTranslator from "../GTranslator/GTranslator";
import DownloadWebsite from "../DownloadWebsite/DownloadWebsite";

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
  language,
  setLanguage,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideNav, setIsSideNav] = useState(false);
  const [isFeatures, setIsFeatures] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

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
        className={`flex items-center justify-between gap-10 p-4 shadow-md shadow-black/50 bg-[#ffffff] sticky top-0 left-0 w-[100%] z-30 ${
          isScrolled ? "" : ""
        }`}
      >
        <Link className="hover:scale-105" to={"/"}>
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-3xl text-[#1674c9]" />
            <h3 className="hidden md:block text-2xl font-bold">EduShala</h3>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-10">
          <ul className="hidden lg:inline-flex gap-4 items-center text-lg ">
            <li
              onClick={() => {
                setIsFeatures(!isFeatures);
              }}
              className={`cursor-pointer flex items-center justify-center gap-2 ${
                isFeatures ? "font-semibold" : ""
              }`}
            >
              Features{" "}
              <IoMdArrowDown className="text-xl rounded-full border-[2px] border-black font-bold hover:scale-105" />
            </li>
          </ul>

          <GTranslator language={language} setLanguage={setLanguage} />
          <DownloadWebsite />
        </div>

        {/* Large Screens Features  */}
        {isFeatures ? (
          <div className="hidden lg:flex flex-row fixed top-[71px] left-0 right-0 z-20 bg-[#ffffff] border-t-[2px] border-t-black shadow-lg shadow-black/50 text-black">
            <div className="p-8 flex flex-wrap gap-8 items-start w-[80%]">
              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Core Features</li>

                <Link to={"/self-paced-courses"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Self paced courses
                  </li>
                </Link>
                <Link to={"/e-library"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Digital Library
                  </li>
                </Link>
                <Link to={"live-classes"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Live Classes
                  </li>
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${question_generator_API}`}
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Exam Preparation
                  </li>
                </a>
                <Link to={"/score-analysis"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Score Analysis
                  </li>
                </Link>
                <Link to={"/cgpa-calculator"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
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
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Digital Attendance System
                  </li>
                </a>
                <a
                  href={`${sign_language_backend_API}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Sign Language Tutorials
                  </li>
                </a>
                <a
                  href="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/28/10/20250128103655-FIOLFGT8.json"
                  target="_blank"
                  rel="noreferrer"
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    AI Doubt Solver
                  </li>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${question_generator_API}`}
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    AI Question Generator
                  </li>
                </a>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Adaptive Learning</li>
                <Link to={"/dashboard"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Dashboard
                  </li>
                </Link>
                <Link to={"/quiz"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Quiz
                  </li>
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${quiz_backend_API}`}
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Quiz Score Analyzer
                  </li>
                </a>
                <Link to={"/time-management"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
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
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Sign Language Alphabets
                  </li>
                </a>
                <a
                  href={`${sign_language_backend_API}/numbers`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Sign Language Numbers
                  </li>
                </a>
                <Link to={"/digital-orbit-writer"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Digital Orbit Writer
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Gamified Learning</li>
                <Link to={"/games/bingo"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Bingo
                  </li>
                </Link>
                <Link to={"/games/sudoku"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Sudoku
                  </li>
                </Link>
                <Link to={"/games/maze"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Maze
                  </li>
                </Link>
                <Link to={"/games/memory-match"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Memory Match
                  </li>
                </Link>
                <Link to={"/games/words-color-match"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Words Color Match
                  </li>
                </Link>
                <Link to={"/games/voice-match"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Voice Match
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Shortcuts</li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(100);
                    setIsFeatures(false);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                >
                  Keyboard Cursor
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(100);
                    setIsFeatures(false);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                >
                  Voice Cursor
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(700);
                    setIsFeatures(false);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                >
                  Screen Reader
                </li>
                <li
                  onClick={() => {
                    handleShortcutsNavigation(1200);
                    setIsFeatures(false);
                  }}
                  className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                >
                  Screen Magnifier
                </li>
                <Link to={"/voice-to-text"}>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Voice to Text
                  </li>
                </Link>
              </ul>

              <ul className="list-none flex flex-col gap-2 text-[13px]">
                <li className="my-4 font-bold text-lg">Assets</li>

                <a href={Brochure} download>
                  <li
                    onClick={() => {
                      setIsFeatures(false);
                    }}
                    className="hover:scale-[1.02] hover:cursor-pointer hover:underline"
                  >
                    Brochure
                  </li>
                </a>
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
          {token ? (
            <div className="flex items-center justify-center gap-2">
              <Link to={"/profile"}>
                <button className="bg-bluegradientR hover:scale-105 text-white font-semibold w-fit px-4 py-2 border-none outline-none rounded">
                  Profile
                </button>
              </Link>

              <div
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("loginTime");
                  localStorage.removeItem("role");
                  window.location.reload();
                }}
                className="p-2 cursor-pointer rounded-full border-[2px] font-bold border-red-500 text-red-500 hover:scale-105 hover:bg-red-500 hover:text-white"
              >
                <MdLogout className="text-2xl" />
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="bg-bluegradientR hover:scale-105 text-white font-semibold w-fit px-4 py-2 border-none outline-none rounded">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Small Screens */}
        {isSideNav ? (
          <ul className="z-2 w-full fixed top-[69px] border-t-[2px] border-t-black left-0 lg:hidden bg-[#ffffff] p-4 py-8 flex flex-col gap-8">
            {token ? (
              <>
                <Link
                  to={"/profile"}
                  className="mx-auto flex items-center justify-center gap-4"
                >
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                  >
                    <button className="bg-bluegradientR text-white font-semibold w-fit px-4 py-2 border-none outline-none rounded">
                      Profile
                    </button>
                  </li>

                  <li
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("loginTime");
                      localStorage.removeItem("role");
                      window.location.reload();
                    }}
                    className="p-2 cursor-pointer w-fit rounded-full border-[2px] font-bold border-red-500 text-red-500 hover:scale-105 hover:bg-red-500 hover:text-white"
                  >
                    <MdLogout className="text-2xl" />
                  </li>
                </Link>
              </>
            ) : (
              <Link to={"/login"} className="mx-auto">
                <button
                  onClick={() => {
                    setIsSideNav(false);
                  }}
                  className="bg-bluegradientR text-white font-semibold w-fit px-4 py-2 border-none outline-none rounded"
                >
                  Login
                </button>
              </Link>
            )}

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-lg text-center">Features</h1>
              <ul className="bg-white text-black flex flex-col gap-4 p-4">
                <Link to={"/self-paced-courses"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Courses
                  </li>
                </Link>
                <Link to={"/e-library"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Digital Library
                  </li>
                </Link>
                <Link to={"/games"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Gamified Learning
                  </li>
                </Link>
                <Link to={"/quiz"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Quiz
                  </li>
                </Link>
                <Link to={"/dashboard"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Dashboard
                  </li>
                </Link>
                <Link to={"/time-management"}>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Time Management
                  </li>
                </Link>
                <a href={Brochure} download>
                  <li
                    onClick={() => {
                      setIsSideNav(false);
                    }}
                    className="hover:scale-105"
                  >
                    Brochure
                  </li>
                </a>
              </ul>

              <h1 className="font-bold text-lg text-center">Shortcuts</h1>
              <ul className="bg-white text-black flex flex-col gap-4 p-4">
                <li
                  onClick={() => {
                    setIsVisible(!isVisible);
                    setIsSideNav(false);
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
                    setIsSideNav(false);
                  }}
                  className="hover:scale-105"
                >
                  Screen Reader
                </li>

                <li
                  onClick={() => {
                    setIsCursorActive(!isCursorActive);
                    setIsSideNav(false);
                  }}
                  className="hover:scale-105"
                >
                  Keyboard Cursor
                </li>

                <li
                  onClick={() => {
                    setIsListening(!isListening);
                    setIsSideNav(false);
                  }}
                  className="hover:scale-105"
                >
                  Voice Cursor
                </li>
              </ul>
            </div>
          </ul>
        ) : (
          ""
        )}

        {isSideNav ? (
          <MdOutlineClose
            onClick={() => {
              setIsSideNav(false);
            }}
            className="lg:hidden text-3xl cursor-pointer"
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => {
              setIsSideNav(true);
            }}
            className="lg:hidden text-3xl cursor-pointer"
          />
        )}
      </nav>
    </>
  );
};

export default Navbar;
