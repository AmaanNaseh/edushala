import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import AndroidPhoneLogo from "../Assets/WebDownloadPage/AndroidPhone.png";
import iOSPhoneLogo from "../Assets/WebDownloadPage/iOSPhone.png";
import DesktopLogo from "../Assets/WebDownloadPage/Desktop.png";

const WebDownloadPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const { y } = location.state.scrollTo;
      window.scrollTo(0, y || 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-10">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Install our website on your device for offline experience!
        </h1>

        <div className="flex flex-col items-center justify-center md:flex-row flex-wrap gap-10 md:gap-20 lg:gap-40">
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-[200px]">
              <img src={DesktopLogo} alt="Desktop" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4 max-w-[300px]">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center">
                Install on Laptop/PC
              </h2>
              <ul className="space-y-2 list-disc">
                <li>
                  In Chrome or Edge, look for the "+" icon near the address bar.
                </li>
                <li>Click the "+" icon to install the app.</li>
                <li>
                  The app will be added to your Start Menu (Windows) or
                  Applications folder (Mac).
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-[100px]">
              <img src={AndroidPhoneLogo} alt="Android" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4 max-w-[300px]">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center">
                Install on Android
              </h2>
              <ul className="space-y-2 list-disc">
                <li>Tap the "Add to Home Screen" button in your browser.</li>
                <li>Install the app.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-[100px]">
              <img src={iOSPhoneLogo} alt="iOS" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4 max-w-[300px]">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center">
                Install on iOS
              </h2>
              <ul className="space-y-2 list-disc">
                <li>Open the website in Safari.</li>
                <li>Tap the "Share" icon (the square with an arrow).</li>
                <li>Select "Add to Home Screen".</li>
                <li>Tap "Add" to install the app on your home screen.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDownloadPage;
