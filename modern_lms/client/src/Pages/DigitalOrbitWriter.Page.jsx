import React, { useState, useEffect, useCallback, useRef } from "react";

const DigitalOrbitWriterPage = () => {
  const [inputPattern, setInputPattern] = useState("");
  const [typedText, setTypedText] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");

  const numberTimeout = useRef(null);

  const [starCount, setStarCount] = useState(0);
  const [hiphenCount, setHiphenCount] = useState(0);

  const patternToAlphabet = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
    5: "E",
    6: "F",
    7: "G",
    8: "H",
    9: "I",
    10: "J",
    11: "K",
    12: "L",
    13: "M",
    14: "N",
    15: "O",
    16: "P",
    17: "Q",
    18: "R",
    19: "S",
    20: "T",
    21: "U",
    22: "V",
    23: "W",
    24: "X",
    25: "Y",
    26: "Z",
  };

  useEffect(() => {
    const handleEnterPress = (event) => {
      if (event.key === "*") {
        setStarCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, []);

  useEffect(() => {
    const handleHiphenPress = (event) => {
      if (event.key === "-") {
        setHiphenCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("keydown", handleHiphenPress);

    return () => {
      window.removeEventListener("keydown", handleHiphenPress);
    };
  }, []);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  };

  const speakNumberWithDelay = (number) => {
    clearTimeout(numberTimeout.current);

    numberTimeout.current = setTimeout(() => {
      speakText(number);
    }, 1000);
  };

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      "Hit star or asterisk 3 times for instruction and 3 times again for cancelling."
    );

    utterance.onend = () => {
      speechSynthesis.cancel();
    };

    speechSynthesis.speak(utterance);

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (starCount === 3) {
      speakText(
        "Instructions: Press keys 1-26 for alphabets in sequence (1 and 2 digit numbers only), hit Enter to confirm, hit Space for space, dot to delete the last number in the pattern, and + to remove the last letter entered. Press any number to start writing and hiphen or minus 3 times when completed to listen the final statement."
      );
    } else if (starCount === 6) {
      speechSynthesis.cancel();
      speakText("Stopped...");
      setStarCount(0);
    }
  }, [starCount]);

  useEffect(() => {
    if (hiphenCount === 3) {
      speakText(typedText);
    } else if (hiphenCount === 6) {
      speechSynthesis.cancel();
      speakText("Stopped...");
      setHiphenCount(0);
    }
  }, [hiphenCount]);

  const handleKeyPress = useCallback(
    (event) => {
      const key = event.key;

      if (event.repeat) return;

      if (key >= "0" && key <= "9") {
        setInputPattern((prev) => {
          if (prev.length < 2) {
            const newPattern = prev + key;
            speakNumberWithDelay(key);
            return newPattern;
          }
          return prev;
        });
      } else if (key === "Enter") {
        const letter = patternToAlphabet[inputPattern];
        if (letter) {
          speakText(letter);
          setTypedText((prev) => prev + letter);
        }
        setInputPattern("");
      } else if (key === " ") {
        speakText("Space");
        setTypedText((prev) => prev + " ");
        setInputPattern("");
      } else if (key === "+") {
        if (typedText.length > 0) {
          const lastLetter = typedText.slice(-1);
          setTypedText((prev) => prev.slice(0, -1));
          speakText(
            lastLetter === " " ? "Removed Space" : `Removed ${lastLetter}`
          );
        }
      } else if (key === ".") {
        if (inputPattern.length > 0) {
          const lastNumber = inputPattern.slice(-1);
          setInputPattern((prev) => prev.slice(0, -1));
          speakText(`Removed ${lastNumber}`);
        }
      }
    },
    [inputPattern, typedText]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div className="min-h-[50vh] m-4 p-4 md:m-10 md:p-10 flex flex-col gap-8">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center italic my-4 md:my-7">
          Digital Orbit Writer
        </h1>
        <p className="text-black text-justify mx-8 font-semibold">
          Instructions: Press keys 1-26 for alphabets in sequence (1 and 2 digit
          numbers only), hit Enter to confirm, hit Space for space, hit dot to
          delete the last number in the pattern, and hit + to remove the last
          letter entered. Press any number to start writing and hiphen or dash
          or minus 3 times when completed to listen the final statement.
        </p>
        <div className="px-5 py-4 bg-[#BADAFF] shadow-md min-h-[200px] max-h-fit">
          <p className="text-2xl font-bold text-black">
            Typed Text: {typedText}
          </p>
          <p className="text-black my-2 mt-4 text-center">
            Current Pattern: {inputPattern || "None"}
          </p>
        </div>
      </div>
    </>
  );
};

export default DigitalOrbitWriterPage;
