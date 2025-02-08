import React, { useState, useEffect } from "react";

const Magnify = ({ isVisible, setIsVisible }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredText, setHoveredText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const elementAtCursor = document.elementFromPoint(e.clientX, e.clientY);

      if (elementAtCursor && elementAtCursor.innerText) {
        setHoveredText(elementAtCursor.innerText);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "+") {
        setIsVisible((prevState) => {
          const newState = !prevState;

          window.speechSynthesis.cancel();

          const message = newState
            ? "Magnifier activated"
            : "Magnifier stopped";
          const speech = new SpeechSynthesisUtterance(message);
          window.speechSynthesis.speak(speech);

          return newState;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="absolute pointer-events-none z-50 text-white font-bold bg-black/50 border-2 border-black p-4"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y + window.scrollY}px`,
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            maxWidth: "calc(100vw - 20px)",
            maxHeight: "80vh",
            overflow: "auto",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {hoveredText && <span>{hoveredText}</span>}{" "}
        </div>
      )}
    </>
  );
};

export default Magnify;
