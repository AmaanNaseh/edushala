import React, { useEffect } from "react";
import VirtualKeyboard from "../Components/VirtualKeyboard/VirtualKeyboard";
import VirtualNumpad from "../Components/VirtualNumpad/VirtualNumpad";
import { useLocation } from "react-router-dom";

const ShortcutsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const { y } = location.state.scrollTo;
      window.scrollTo(0, y || 0);
    }
  }, [location]);

  return (
    <>
      <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
        General Shortcuts
      </h1>
      <div className="flex flex-col gap-4 md:gap-8 m-4 md:m-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="transform scale-[0.4] md:scale-75 lg:scale-80 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualKeyboard keyId={"Shift F1"} />
          </div>
          <h2 className="text-black text-lg md:text-2xl text-center">
            To activate Keyboard cursor, Press{" "}
            <span className="font-bold">Shift + F1</span> twice & to cancel,
            again press twice
          </h2>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="transform scale-[0.4] md:scale-75 lg:scale-80 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualKeyboard keyId={"Shift F2"} />
          </div>
          <h2 className="text-black text-lg md:text-2xl text-center">
            To activate Voice cursor, Press{" "}
            <span className="font-bold">Shift + F2</span> twice & to cancel,
            again press twice
          </h2>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="transform scale-[0.4] md:scale-75 lg:scale-80 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualKeyboard keyId={"Shift Space"} />
          </div>
          <h2 className="text-black text-lg md:text-2xl text-center">
            To activate Screen Reader, Press{" "}
            <span className="font-bold">Shift + Space</span> & to cancel, press
            again
          </h2>
        </div>
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="transform scale-[0.4] md:scale-75 lg:scale-80 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualKeyboard keyId={"Shift +"} />
          </div>
          <h2 className="text-black text-lg md:text-2xl text-center">
            To activate Magnifier, Press{" "}
            <span className="font-bold">Shift and +</span> & to cancel, press
            again
          </h2>
        </div>
      </div>
      <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
        Voice to Text Page Shortcuts
      </h1>
      <div className="flex flex-col items-center justify-center m-4 md:m-8">
        <div className="flex flex-col items-center gap-6 md:gap-12 lg:flex-row lg:gap-24">
          <div className="transform scale-[0.8] md:scale-100 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualNumpad blinkKeys={[10, 16]} />
          </div>
          <ul className="text-black text-sm md:text-md lg:text-xl flex flex-col gap-2 list-none">
            <li>
              <span className="font-bold mr-4">Enter</span> Press 2 times to
              start speaking & again 2 times for stopping
            </li>
            <li>
              <span className="font-bold mr-4">+</span> Press 2 times to listen
              whatever written
            </li>
          </ul>
        </div>
      </div>
      <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
        Orbit Writer Page Shortcuts
      </h1>
      <div className="flex flex-col items-center justify-center m-4 md:m-8">
        <div className="flex flex-col items-center gap-6 md:gap-12 lg:flex-row lg:gap-24">
          <div className="transform scale-[0.8] md:scale-100 flex flex-col gap-2 md:gap-8 items-center justify-center max-w-full">
            <VirtualNumpad
              blinkKeys={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              ]}
            />
          </div>
          <ul className="text-black text-sm md:text-md lg:text-xl flex flex-col gap-2 list-none">
            <li>
              <span className="font-bold mr-4">*</span> 3 times for Instructions
              & again 3 times for stopping.
            </li>{" "}
            <li>
              <span className="font-bold mr-4">1-9</span> Alphabets based on
              sequential pattern, 1-A, 2-B, and so on
            </li>
            <li>
              <span className="font-bold mr-4">Space</span> Gap between
              alphabets or words
            </li>
            <li>
              <span className="font-bold mr-4">.</span> Delete last entered
              number
            </li>
            <li>
              <span className="font-bold mr-4">+</span> Delete last entered
              alphabet
            </li>{" "}
            <li>
              <span className="font-bold mr-4">Enter</span> After typing number,
              Enter to type alphabet
            </li>{" "}
            <li>
              <span className="font-bold mr-4">-</span> Press 3 times to listen
              whatever typed
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShortcutsPage;
