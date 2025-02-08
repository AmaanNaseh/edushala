import React, { useEffect, useState } from "react";

const VirtualKeyboard = ({ keyId }) => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col items-start bg-[#cbccc3] rounded-lg p-4 justify-start space-y-2">
      {/* Row 1 (Esc F1-F12) */}
      <div className="flex space-x-2">
        <div
          className={`w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            isBlinking && keyId === "Esc" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Esc" ? keyId : ""}
          </span>
        </div>
        {/* Esc */}
        <div
          className={`w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md  flex items-center justify-center ${
            isBlinking && keyId === "Shift F1" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Shift F1" ? "F1" : ""}
          </span>
        </div>
        {/* F1 */}
        <div
          className={`w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md  flex items-center justify-center ${
            isBlinking && keyId === "Shift F2" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Shift F2" ? "F2" : ""}
          </span>
        </div>
        {/* F2 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F3 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F4 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F5 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F6 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F7 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F6 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F9 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F10 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F11 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F12 */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* btn */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* btn */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* btn */}
        <div className="w-10 h-6 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* btn */}
      </div>

      {/* Row 2 (` 1-9 0 - + backspace) */}
      <div className="flex space-x-2">
        <div className="w-10 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* ` */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 1 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 2 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 3 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 4 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 5 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 6 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 7 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 8 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 9 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* 0 */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* - */}
        <div
          className={`w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            isBlinking && keyId === "Shift +" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Shift +" ? "+" : ""}
          </span>
        </div>
        {/* + */}
        <div className="w-[93px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Backspace */}
      </div>

      {/* Row 3 (Tab Q W E R T Y U I O P [ ] \) */}
      <div className="flex space-x-2">
        <div className="w-[68px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Tab */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Q */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* W */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* E */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* R */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* T */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Y */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* U */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* I */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* O */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* P */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* [ */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* ] */}
        <div className="w-[65px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* \ */}
      </div>

      {/* Row 4 (Caps A S D F G H J K L ; ' Enter) */}
      <div className="flex space-x-2">
        <div className="w-20 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Caps */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* A */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* S */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* D */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* F */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* G */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* H */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* J */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* K */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* L */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* ; */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* ' */}
        <div
          className={`w-28 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            isBlinking && keyId === "Enter" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Enter" ? keyId : ""}
          </span>
        </div>
        {/* Enter */}
      </div>

      {/* Row 5 (Shift Z X C V B N M , . / Shift) */}
      <div className="flex space-x-2">
        {/* Shift */}
        <div
          className={`w-[124px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            isBlinking && keyId.includes("Shift") ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId.includes("Shift") ? "Shift" : ""}
          </span>
        </div>
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Z */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* X */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* C */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* V */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* B */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* N */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* M */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* , */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* . */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* / */}
        <div className="w-[124px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Shift */}
      </div>

      {/* Row 6 (Ctrl Fn Windows Alt Space Alt Ctrl Left Up Down Right) */}
      <div className="flex space-x-2">
        <div
          className={`w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md`}
        ></div>

        {/* Ctrl */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Fn */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Windows */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Alt */}
        <div
          className={`w-[294px] h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            isBlinking && keyId === "Shift Space" ? "bg-white " : ""
          }`}
        >
          <span
            className={`font-bold  ${isBlinking ? "text-black" : "text-white"}`}
          >
            {keyId === "Shift Space" ? "Space" : ""}
          </span>
        </div>
        {/* Space */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Alt */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Ctrl */}
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Left */}
        <div className="flex flex-col gap-1">
          <div className="w-16 h-[22px] bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
          {/* Up */}
          <div className="w-16 h-[22px] bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
          {/* Down */}
        </div>
        <div className="w-12 h-12 bg-black/80 shadow-md shadow-black/40 z-20 rounded-md"></div>
        {/* Right */}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
