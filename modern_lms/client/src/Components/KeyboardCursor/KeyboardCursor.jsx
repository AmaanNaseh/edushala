import React, { useState, useEffect, useRef } from "react";
import { PiCursorFill } from "react-icons/pi";

const KeyboardCursor = ({ isCursorActive, setIsCursorActive }) => {
  const [f1PressCount, setF1PressCount] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Cursor position

  const moveAmount = 20;
  const synth = useRef(window.speechSynthesis);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.current.speak(utterance);
  };

  const handleKeyPress = (e) => {
    if (e.key === "F1") {
      setF1PressCount((prevCount) => prevCount + 1);
    } else if (e.key === "0" && isCursorActive) {
      triggerMouseClick("left");
    } else if (e.key === "." && isCursorActive) {
      triggerMouseClick("right");
    }
  };

  const triggerMouseClick = (button) => {
    console.log("Cursor Position:", cursorPosition);

    const mouseEvent = new MouseEvent("click", {
      clientX: cursorPosition.x,
      clientY: cursorPosition.y,
      bubbles: true,
      cancelable: true,
      button: button === "left" ? 0 : 2,
    });

    const element = document.elementFromPoint(
      cursorPosition.x,
      cursorPosition.y
    );
    console.log("Element under the cursor:", element);

    if (element) {
      element.dispatchEvent(mouseEvent);
      speak(
        `${button} click at position (${cursorPosition.x}, ${cursorPosition.y})`
      );
    } else {
      speak("No element under the cursor to click.");
    }
  };

  const moveCursor = (e) => {
    if (!isCursorActive) return;

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }

    setCursorPosition((prevPosition) => {
      const newPosition = { ...prevPosition };
      switch (e.key) {
        case "ArrowUp":
          newPosition.y -= moveAmount;
          break;
        case "ArrowDown":
          newPosition.y += moveAmount;
          break;
        case "ArrowLeft":
          newPosition.x -= moveAmount;
          break;
        case "ArrowRight":
          newPosition.x += moveAmount;
          break;
        default:
          break;
      }

      if (newPosition.y <= 30) {
        window.scrollBy(0, -moveAmount);
      }
      if (newPosition.y >= window.innerHeight - 30) {
        window.scrollBy(0, moveAmount);
      }

      return newPosition;
    });
  };

  useEffect(() => {
    if (f1PressCount === 2) {
      setIsCursorActive(true);
      speak("Keyboard cursor activated");
    } else if (f1PressCount === 4) {
      setIsCursorActive(false);
      speak("Stopped keyboard cursor");
      setF1PressCount(0);
    }
  }, [f1PressCount]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keydown", moveCursor);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", moveCursor);
    };
  }, [isCursorActive, f1PressCount]);

  useEffect(() => {
    const updateCursorPosition = (event) => {
      if (!isCursorActive) return;
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [isCursorActive]);

  return (
    <div>
      {isCursorActive && (
        <div
          className="absolute z-50 pointer-events-none w-fit"
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
          }}
        >
          <PiCursorFill className="text-5xl text-red-700" />
        </div>
      )}
    </div>
  );
};

export default KeyboardCursor;
