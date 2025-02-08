import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AndroidPhoneLogo from "../Assets/WebDownloadPage/AndroidPhone.png";
import iOSPhoneLogo from "../Assets/WebDownloadPage/iOSPhone.png";
import DesktopLogo from "../Assets/WebDownloadPage/Desktop.png";

const WebDownloadPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const { y } = location.state.scrollTo;
      window.scrollTo(0, y || 0);
    }
  }, [location]);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      setIsIOS(true);
    } else if (userAgent.includes("android")) {
      setIsAndroid(true);
    } else {
      setIsDesktop(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <div className="container mx-auto px-6 py-10">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Install our website on your device for offline experience!
        </h1>

        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
            <div className="w-[300px]">
              <img src={DesktopLogo} alt="Desktop" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
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

              <button
                onClick={handleInstallClick}
                className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 mx-auto block md:mt-12 my-8"
              >
                Install Software
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
            <div className="w-[300px]">
              <img src={AndroidPhoneLogo} alt="Android" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
                Install on Android
              </h2>
              <ul className="space-y-2 list-disc">
                <li>Tap the "Add to Home Screen" button in your browser.</li>
                <li>Install the app.</li>
              </ul>
              <button
                onClick={handleInstallClick}
                className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 mx-auto block md:mt-12 my-8"
              >
                Install App
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
            <div className="w-[300px]">
              <img src={iOSPhoneLogo} alt="iOS" className="w-full" />
            </div>
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-bold italic text-xl md:text-2xl bg-bluegradientR bg-clip-text text-transparent text-center my-4">
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
