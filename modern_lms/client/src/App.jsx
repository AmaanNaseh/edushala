import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router";

import Navbar from "./Components/Navbar/Navbar";

import LoginPage from "./Pages/Login/Login.Page";
import SignupPage from "./Pages/Signup/Signup.Page";

import HomePage from "./Pages/Home.Page";
import AboutPage from "./Pages/About.Page";
import ShortcutsPage from "./Pages/Shortcuts.Page";
import ProfilePage from "./Pages/Profile.Page";
import AttributionsPage from "./Pages/Attributions.Page";
import LiveClassesPage from "./Pages/LiveClasses.Page";
import DigitalOrbitWriterPage from "./Pages/DigitalOrbitWriter.Page";

import AdminCourses from "./Pages/LMS/AdminCourses.Page";
import UserCourses from "./Pages/LMS/UserCourses.Page";
import CreateCourse from "./Pages/LMS/CreateCourse";
import GetCourse from "./Pages/LMS/GetCourse";
import UpdateCourse from "./Pages/LMS/UpdateCourse";
import DeleteCourse from "./Pages/LMS/DeleteCourse";
import CourseDetailsPage from "./Pages/LMS/CourseDetailsPage";

import ElibraryPage from "./Pages/ELibrary/Elibrary.Page";
import BookCreate from "./Pages/ELibrary/BookCreate";
import BookDelete from "./Pages/ELibrary/BookDelete";
import BookGet from "./Pages/ELibrary/BookGet";
import BookUpdate from "./Pages/ELibrary/BookUpdate";

import CGPACalculatorPage from "./Pages/CGPACalculator.Page";
import ScoreAnalysisPage from "./Pages/ScoreAnalysis.Page";
import WebDownloadPage from "./Pages/WebDownload.Page";

import DashbordPage from "./Pages/Dashbord.Page";
import QuizPage from "./Pages/Quiz.Page";
import TimeManagementPage from "./Pages/TimeManagement.Page";

import GamesPage from "./Pages/Games.Page";
import Bingo from "./Pages/Games/Bingo";
import MemoryMatch from "./Pages/Games/MemoryMatch";
import WordsColorMatch from "./Pages/Games/WordsColorMatch";
import VoiceMatch from "./Pages/Games/VoiceMatch";
import SolveMaze from "./Pages/Games/SolveMaze";
import Sudoku from "./Pages/Games/Sudoku";

import VoiceToTextPage from "./Pages/VoiceToText.Page";
import KeyboardCursor from "./Components/KeyboardCursor/KeyboardCursor";
import ScreenReader from "./Components/ScreenReader/ScreenReader";
import VoiceCursor from "./Components/VoiceCursor/VoiceCursor";
import Magnify from "./Components/Magnify/Magnify";

import LocalAccessPage from "./Pages/LocalAccess.Page";

import Footer from "./Components/Footer/Footer";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

// Admin-Only Route Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role"); // Fetch role from localStorage
  return token && role === "admin" ? children : <Navigate to="/e-library" />;
};

const App = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [synthActive, setSynthActive] = useState(false);
  const synth = useRef(window.speechSynthesis);

  const speakPageContent = () => {
    const pageContent = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(
      `Screen Reader Activated... ${pageContent}`
    );
    synth.current.speak(utterance);
  };

  useEffect(() => {
    const role = localStorage.getItem("role"); // Fetch role from localStorage
    setUserRole(role);
  }, []);

  useEffect(() => {
    const fromBackForward = sessionStorage.getItem("fromBackForward");

    if (!fromBackForward) {
      window.scrollTo(0, 0);
    }

    sessionStorage.removeItem("fromBackForward");
  }, [location]);

  useEffect(() => {
    const handlePopState = () => {
      sessionStorage.setItem("fromBackForward", "true");
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <Navbar
        isCursorActive={isCursorActive}
        setIsCursorActive={setIsCursorActive}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isListening={isListening}
        setIsListening={setIsListening}
        synth={synth}
        speakPageContent={speakPageContent}
        synthActive={synthActive}
        setSynthActive={setSynthActive}
      />

      <div>
        <KeyboardCursor
          isCursorActive={isCursorActive}
          setIsCursorActive={setIsCursorActive}
        />
        <VoiceCursor
          isListening={isListening}
          setIsListening={setIsListening}
        />
        <ScreenReader
          synth={synth}
          speakPageContent={speakPageContent}
          synthActive={synthActive}
          setSynthActive={setSynthActive}
        />
        <Magnify isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>

      <Routes>
        <Route path={"/"} element={<HomePage />} />

        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/signup"} element={<SignupPage />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route path={"/shortcuts"} element={<ShortcutsPage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/attributions"} element={<AttributionsPage />} />
        <Route path={"/live-classes"} element={<LiveClassesPage />} />
        <Route
          path={"/digital-orbit-writer"}
          element={<DigitalOrbitWriterPage />}
        />
        <Route path={"/dashboard"} element={<DashbordPage />} />
        <Route path={"/quiz"} element={<QuizPage />} />
        <Route path={"/time-management"} element={<TimeManagementPage />} />
        <Route path={"/voice-to-text"} element={<VoiceToTextPage />} />
        <Route path={"/score-analysis"} element={<ScoreAnalysisPage />} />
        <Route path={"/cgpa-calculator"} element={<CGPACalculatorPage />} />
        <Route path={"/download-website"} element={<WebDownloadPage />} />
        <Route path={"/local-access"} element={<LocalAccessPage />} />
        <Route path={"/local-access/alphabets"} element={<LocalAccessPage />} />
        <Route path={"/local-access/numbers"} element={<LocalAccessPage />} />

        {/* LMS MERM Pages */}
        <Route
          path="/self-paced-courses"
          element={
            <PrivateRoute>
              {userRole === "admin" ? <AdminCourses /> : <UserCourses />}
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/create-course"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/get-course/:id"
          element={
            <PrivateRoute>
              <GetCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/update-course/:id"
          element={
            <PrivateRoute>
              <UpdateCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/delete-course/:id"
          element={
            <PrivateRoute>
              <DeleteCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/user/course-details/:id"
          element={
            <PrivateRoute>
              <CourseDetailsPage />
            </PrivateRoute>
          }
        />

        {/* Book MERN Pages */}
        <Route path={"/e-library"} element={<ElibraryPage />} />
        <Route path={"/api/book/:id"} element={<BookGet />} />
        <Route
          path="/api/create-book"
          element={
            <AdminRoute>
              <BookCreate />
            </AdminRoute>
          }
        />

        <Route
          path="/api/update-book/:id"
          element={
            <AdminRoute>
              <BookUpdate />
            </AdminRoute>
          }
        />
        <Route
          path="/api/delete-book/:id"
          element={
            <AdminRoute>
              <BookDelete />
            </AdminRoute>
          }
        />

        {/* Games */}

        <Route path={"/games"} element={<GamesPage />} />
        <Route path={"/games/sudoku"} element={<Sudoku />} />
        <Route path={"/games/memory-match"} element={<MemoryMatch />} />
        <Route path={"/games/maze"} element={<SolveMaze />} />
        <Route path={"/games/bingo"} element={<Bingo />} />
        <Route
          path={"/games/words-color-match"}
          element={<WordsColorMatch />}
        />
        <Route path={"/games/voice-match"} element={<VoiceMatch />} />
      </Routes>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;
