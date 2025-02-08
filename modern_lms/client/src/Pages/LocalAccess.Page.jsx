import React from "react";
import AttendanceSystemVideo from "../Assets/LocalAccessPage/Attendance_System.mp4";
import SignLanguageVideo from "../Assets/LocalAccessPage/Sign_Language.mp4";

const LocalAccessPage = () => {
  return (
    <>
      <div className="m-4 p-4 md:m-10 md:p-10 min-h-[75vh]">
        <h1 className="text-center text-lg font-semibold text-red-600">
          Sorry the following content is not available online, please access the
          code through github repo link given in Footer and run it locally.
        </h1>
        <p className="text-center font-semibold my-4">
          The functionality of attendance system or AI-driven sign language
          tutorials can be seen in video below:
        </p>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="w-[300px] md:w-[450px] lg:w-[500px] bg-black p-4">
            <video
              controls
              className="w-full"
              src={AttendanceSystemVideo}
            ></video>
          </div>
          <div className="w-[300px] md:w-[450px] lg:w-[500px] bg-black p-4">
            <video controls className="w-full" src={SignLanguageVideo}></video>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalAccessPage;
