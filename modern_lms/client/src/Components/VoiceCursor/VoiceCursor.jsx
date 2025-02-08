import React, { useState, useEffect, useRef } from "react";
import { PiCursorFill } from "react-icons/pi";

const VoiceCursor = ({ isListening, setIsListening }) => {
  const [hasSpokenActivation, setHasSpokenActivation] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [f2PressCount, setF2PressCount] = useState(0);
  const recognition = useRef(null);
  const synth = useRef(window.speechSynthesis);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.current.speak(utterance);
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.lang = "en-US";
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.maxAlternatives = 1;

      recognition.current.onresult = (event) => {
        const command =
          event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Voice Command:", command);
        moveCursor(command);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error", event);
      };

      recognition.current.onend = () => {
        if (isListening) {
          recognition.current.start();
        }
      };
    } else {
      alert("Speech Recognition API is not supported in this browser");
    }

    const handleKeyPress = (e) => {
      if (e.key === "F2") {
        setF2PressCount((prevCount) => prevCount + 1);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      if (recognition.current) recognition.current.stop();
    };
  }, [isListening]);

  useEffect(() => {
    if (f2PressCount === 2 && !hasSpokenActivation) {
      setIsListening(true);
      speak("Voice cursor activated, start speaking");
      setHasSpokenActivation(true);
      recognition.current.start();
    } else if (f2PressCount === 4) {
      setIsListening(false);
      speak("Stopped Voice Cursor");
      setF2PressCount(0);
      setHasSpokenActivation(false);
      recognition.current.stop();
    }
  }, [f2PressCount, hasSpokenActivation]);

  const moveCursor = (command) => {
    setCursorPosition((prevPosition) => {
      let newTop = prevPosition.top;
      let newLeft = prevPosition.left;

      const moveAmount = 50;

      if (command.includes("up")) {
        newTop -= moveAmount;
      } else if (command.includes("down")) {
        newTop += moveAmount;
      } else if (command.includes("left")) {
        newLeft -= moveAmount;
      } else if (command.includes("right")) {
        newLeft += moveAmount;
      }

      return { top: newTop, left: newLeft };
    });
  };

  return (
    <div className="relative">
      {isListening && (
        <div
          style={{
            position: "absolute",
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left}px`,
          }}
          className="w-fit"
        >
          <PiCursorFill className="text-5xl text-yellow-400" />
        </div>
      )}
    </div>
  );
};

export default VoiceCursor;
