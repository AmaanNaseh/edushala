import React from "react";
import GMeetLogo from "../Assets/LiveClassPage/GMeet.png";
import ZoomLogo from "../Assets/LiveClassPage/Zoom.png";
import WebinarjamLogo from "../Assets/LiveClassPage/Webinarjam.png";
import ZohoLogo from "../Assets/LiveClassPage/Zoho.png";

const LiveClassesPage = () => {
  return (
    <>
      <div className="min-h-[75vh]">
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-14 lg:gap-20-4 md:m-8 lg:m-12">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[230px] flex flex-col items-center justify-center w-fit px-8 py-5 gap-2 hover:scale-105 z-10 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg"
            href="https://meet.google.com/landing"
          >
            <div className="w-[150px]">
              <img src={GMeetLogo} alt="image" className="w-full" />
            </div>
            <h3 className="text-center font-bold text-xl">Google Meet</h3>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[230px] flex flex-col items-center justify-center w-fit px-8 py-5 gap-2 hover:scale-105 z-10 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg"
            href="https://www.zoom.com/"
          >
            <div className="w-[150px]">
              <img src={ZoomLogo} alt="image" className="w-full" />
            </div>
            <h3 className="text-center font-bold text-xl">Zoom</h3>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[230px] flex flex-col items-center justify-center w-fit px-8 py-5 gap-2 hover:scale-105 z-10 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg"
            href="https://home.webinarjam.com/index"
          >
            <div className="w-[150px]">
              <img src={WebinarjamLogo} alt="image" className="w-full" />
            </div>
            <h3 className="text-center font-bold text-xl">Webinar Jam</h3>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[230px] flex flex-col items-center justify-center w-fit px-8 py-5 gap-2 hover:scale-105 z-10 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg"
            href="https://www.zoho.com/"
          >
            <div className="w-[150px]">
              <img src={ZohoLogo} alt="image" className="w-full" />
            </div>
            <h3 className="text-center font-bold text-xl">Zoho</h3>
          </a>
        </div>
      </div>
    </>
  );
};

export default LiveClassesPage;
