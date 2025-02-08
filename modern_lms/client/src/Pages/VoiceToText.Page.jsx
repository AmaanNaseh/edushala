import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VoiceToTextPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [enterPressCount, setEnterPressCount] = useState(0);
  const [plusCount, setPlusCount] = useState(0);

  const recognition = useRef(null);
  const synth = useRef(window.speechSynthesis);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.current.speak(utterance);
  };

  console.log(plusCount);

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(
      "Press Enter twice & start speaking & again twice for stopping. Then listen typed statement by tapping Plus button twice..."
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
    const handlePlusPress = (event) => {
      if (event.key === "+") {
        setPlusCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener("keydown", handlePlusPress);

    return () => {
      window.removeEventListener("keydown", handlePlusPress);
    };
  }, []);

  useEffect(() => {
    if (plusCount === 2) {
      speak(transcribedText);
    } else if (plusCount === 4) {
      speechSynthesis.cancel();
      speak("Stopped...");
      setPlusCount(0);
    }
  }, [plusCount, transcribedText]);

  const handleChange = (e) => {
    setTranscribedText(e.target.value);
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.lang = "en-US";
      recognition.current.interimResults = true;
      recognition.current.maxAlternatives = 1;
      recognition.current.continuous = true;
      recognition.current.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const isFinal = event.results[i].isFinal;

          setTranscribedText(
            (prev) => prev + (isFinal ? " " + transcript : transcript)
          );
        }
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
      toast.error("Speech Recognition API is not supported in this browser");
    }

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        setEnterPressCount((prev) => prev + 1);

        if (enterPressCount === 1) {
          if (isListening) {
            setIsListening(false);
            recognition.current.stop();
            speak("Stopped listening");
          } else {
            setIsListening(true);
            recognition.current.start();
            speak("Listening");
          }

          setEnterPressCount(0);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, [isListening, enterPressCount]);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 md:p-10 gap-8">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center italic my-4 md:my-7">
          Voice to Text
        </h1>
        <textarea
          value={transcribedText}
          className="border-black border-[2px] px-5 py-4 max-w-[300px] md:max-w-full md:resize-none shadow-md"
          onChange={handleChange}
          placeholder="Press Enter twice & start speaking & again twice for stopping. Then listen typed statement by tapping Plus button twice..."
          rows={10}
          cols={50}
        />
        <div>
          <p>Status: {isListening ? "Listening..." : "Stopped"}</p>
        </div>
        <ToastContainer position="bottom-left" />
      </div>
    </>
  );
};

export default VoiceToTextPage;
