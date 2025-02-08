import React, { useState, useEffect, useRef } from "react";

const ScreenReader = ({
  synth,
  speakPageContent,
  synthActive,
  setSynthActive,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === " " && e.shiftKey) {
      if (!synthActive) {
        setSynthActive(true);
        speakPageContent();
      } else {
        setSynthActive(false);
        synth.current.cancel();
        const utterance = new SpeechSynthesisUtterance("Stopped");
        synth.current.speak(utterance);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [synthActive]);

  return null;
};

export default ScreenReader;
