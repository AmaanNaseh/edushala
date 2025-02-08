import React, { useEffect, useState } from "react";

const VirtualNumpad = ({ blinkKeys = [] }) => {
  const [keyCount, setKeyCount] = useState(0);
  const [blinkingKeys, setBlinkingKeys] = useState([]);

  const keys = Array.from({ length: 17 }, (_, i) => i);

  useEffect(() => {
    const getBlinkingKeys = () => {
      if (blinkKeys.length > 0) {
        return blinkKeys;
      }
      return keys.sort(() => Math.random() - 0.5);
    };

    const interval = setInterval(() => {
      const newBlinkingKeys = getBlinkingKeys();
      setBlinkingKeys(newBlinkingKeys);

      setKeyCount((prev) => (prev + 1) % newBlinkingKeys.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [blinkKeys]);

  return (
    <div className="flex flex-col items-start bg-[#cbccc3] w-fit rounded-lg p-4 justify-start space-y-2 relative">
      {/* Row 1 */}
      <div className="flex space-x-2">
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(0) && keyCount === blinkingKeys.indexOf(0)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">Num</span>
        </div>
        {/* Numlock */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(1) && keyCount === blinkingKeys.indexOf(1)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">/</span>
        </div>
        {/* / */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(2) && keyCount === blinkingKeys.indexOf(2)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">*</span>
        </div>
        {/* * */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(3) && keyCount === blinkingKeys.indexOf(3)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">-</span>
        </div>
        {/* - */}
      </div>

      {/* Row 2 */}
      <div className="flex space-x-2">
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(4) && keyCount === blinkingKeys.indexOf(4)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">7</span>
        </div>
        {/* 7 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(5) && keyCount === blinkingKeys.indexOf(5)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">8</span>
        </div>
        {/* 8 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(6) && keyCount === blinkingKeys.indexOf(6)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">9</span>
        </div>
        {/* 9 */}
      </div>

      {/* Row 3 */}
      <div className="flex space-x-2">
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(7) && keyCount === blinkingKeys.indexOf(7)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">4</span>
        </div>
        {/* 4 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(8) && keyCount === blinkingKeys.indexOf(8)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">5</span>
        </div>
        {/* 5 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(9) && keyCount === blinkingKeys.indexOf(9)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">6</span>
        </div>
        {/* 6 */}
      </div>

      <div
        className={`w-12 h-[104px] absolute right-4 top-16 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
          blinkKeys.includes(10) && keyCount === blinkingKeys.indexOf(10)
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        <span className="font-bold">+</span>
      </div>

      {/* Row 4 */}
      <div className="flex space-x-2">
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(11) && keyCount === blinkingKeys.indexOf(11)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">1</span>
        </div>
        {/* 1 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(12) && keyCount === blinkingKeys.indexOf(12)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">2</span>
        </div>
        {/* 2 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(13) && keyCount === blinkingKeys.indexOf(13)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">3</span>
        </div>
        {/* 3 */}
      </div>

      {/* Row 5 */}
      <div className="flex space-x-2">
        <div
          className={`w-[104px] h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(14) && keyCount === blinkingKeys.indexOf(14)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">0</span>
        </div>
        {/* 0 */}
        <div
          className={`w-12 h-12 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
            blinkKeys.includes(15) && keyCount === blinkingKeys.indexOf(15)
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
        >
          <span className="font-bold">.</span>
        </div>
        {/* . */}
      </div>

      <div
        className={`w-12 h-[104px] absolute right-4 bottom-4 shadow-md shadow-black/40 z-20 rounded-md flex items-center justify-center ${
          blinkKeys.includes(16) && keyCount === blinkingKeys.indexOf(16)
            ? "bg-white text-black"
            : "bg-black text-white"
        }`}
      >
        <span className="font-bold text-[13px]">Enter</span>
      </div>
    </div>
  );
};

export default VirtualNumpad;
