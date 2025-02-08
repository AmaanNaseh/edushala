import React from "react";
import QuizML from "../Assets/AboutPage/quiz_ml.png";
import AlphabetsML from "../Assets/AboutPage/cm_alphabets.jpg";
import NumbersML from "../Assets/AboutPage/cm_numbers.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center gap-4 m-4 md:m-10 p-4 md:p-10">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
        About
      </h1>
      <h3 className="font-bold italic text-xl md:text-2xl lg:text-3xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
        Developers
      </h3>
      <ul className="my-4 flex flex-col lg:flex-row gap-10 items-center justify-center">
        <li className="font-semibold">Amaan Naseh (AR 26, GGSIPU)</li>
        <li className="font-semibold">Abdul Waheed Al Faaiz (CSE 27, KRM)</li>
        <li className="font-semibold">Mudassir Ahmed Khan (CSE 26, GGSIPU)</li>
      </ul>
      <h3 className="font-bold italic text-xl md:text-2xl lg:text-3xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
        AI Model Metrics
      </h3>
      <p className="text-center my-3">
        Trained on python 3.11.6 with ML techniques including Random Forest
        Classifier, Mediapipe and Support Vector Machine/Classifier.
      </p>
      <div className="flex flex-wrap gap-20 items-center">
        <div className="flex flex-col items-center justify-center gap-4 p-4 bg-black text-white">
          <h3 className="font-semibold text-xl">Quiz ML model</h3>
          <p>ML : Random Forest Classifier</p>
          <div className="w-[300px]">
            <img src={QuizML} alt="graph" className="w-full" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-4 bg-black text-white">
          <h3 className="font-semibold text-xl">
            Sign Language Alphabets ML model
          </h3>
          <p>ML : Random Forest Classifier</p>
          <div className="w-[300px]">
            <img src={AlphabetsML} alt="graph" className="w-full" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-4 bg-black text-white">
          <h3 className="font-semibold text-xl">
            Sign Language Numbers ML model
          </h3>
          <p>ML : Random Forest Classifier</p>
          <div className="w-[300px]">
            <img src={NumbersML} alt="graph" className="w-full" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-4 bg-black text-white">
          <h3 className="font-semibold text-xl">Attendance System</h3>
          <p className="w-[300px] text-justify">
            Since it trains everytime for new user dynamically using SVM/SVC,
            therefore no fixed evaluation metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
