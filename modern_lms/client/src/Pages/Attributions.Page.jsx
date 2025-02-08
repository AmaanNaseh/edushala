import React from "react";
import FlatIconLogo from "../Assets/AttributionsPage/FlatIcon.svg";
import VecteezyLogo from "../Assets/AttributionsPage/Vecteezy.jpg";
import FreepikLogo from "../Assets/AttributionsPage/Freepik.jpg";
import FreePngImgLogo from "../Assets/AttributionsPage/FreePngImg.png";
import ShutterstockLogo from "../Assets/AttributionsPage/Shutterstock.png";
import PinterestLogo from "../Assets/AttributionsPage/Pinterest.png";
import PixabayLogo from "../Assets/AttributionsPage/Pixabay.png";
import VeryIconLogo from "../Assets/AttributionsPage/VeryIcon.svg";
import PngTreeLogo from "../Assets/AttributionsPage/PngTree.jpg";
import FaviconLogo from "../Assets/AttributionsPage/Favicon.png";
import SapphireSolutionsLogo from "../Assets/AttributionsPage/SapphireSolutions.png";
import EnvatoLogo from "../Assets/AttributionsPage/Envato.svg";
import MixkitLogo from "../Assets/AttributionsPage/Mixkit.jpg";
import DesignInspirationLogo from "../Assets/AttributionsPage/DesignInspiration.png";

const AttributionsPage = () => {
  return (
    <>
      <div className="min-h-[75vh] m-10">
        <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl md:text-4xl lg:text-5xl my-4 md:my-7">
          Attributions
        </h1>

        <p className="text-justify p-2 mx-4 md:mx-10 lg:mx-16 border-black border-[2px]">
          Some of the image or voice content used in our website belongs to
          following references. We have used the free-tier resources with proper
          attribution and all rights of the free images and voices belong to the
          listed sources. The company logo's are displayed for the authenticity
          as well as their company's website is attached as hyperlink.
        </p>

        <div className="m-8">
          <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl mt-20">
            Icons usage
          </h1>
          <ul className="flex flex-wrap flex-col md:flex-row items-center gap-10 font-semibold my-10">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flaticon.com"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px] bg-black p-4">
                  <img src={FlatIconLogo} alt="image" className="w-full" />
                </div>
                <li>Flaticon</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.vecteezy.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[125px]">
                  <img src={VecteezyLogo} alt="image" className="w-full" />
                </div>

                <li>Vecteezy</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.freepik.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={FreepikLogo} alt="image" className="w-full" />
                </div>

                <li>Freepik</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://freepngimg.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={FreePngImgLogo} alt="image" className="w-full" />
                </div>

                <li>Freepngimg</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.shutterstock.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={ShutterstockLogo} alt="image" className="w-full" />
                </div>

                <li>Shutterstock</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://in.pinterest.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[125px]">
                  <img src={PinterestLogo} alt="image" className="w-full" />
                </div>

                <li>Pinterest</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://pixabay.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={PixabayLogo} alt="image" className="w-full" />
                </div>

                <li>Pixabay</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.veryicon.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={VeryIconLogo} alt="image" className="w-full" />
                </div>

                <li>Very Icon</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://pngtree.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[125px]">
                  <img src={PngTreeLogo} alt="image" className="w-full" />
                </div>

                <li>PNG tree</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://favicon.io/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={FaviconLogo} alt="image" className="w-full" />
                </div>

                <li>Favicon.io</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.sapphiresolutions.net/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img
                    src={SapphireSolutionsLogo}
                    alt="image"
                    className="w-full"
                  />
                </div>

                <li>Sapphire Solutions</li>
              </div>
            </a>
          </ul>
          <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl mt-20">
            Voice usage
          </h1>
          <ul className="flex flex-wrap flex-col md:flex-row items-center gap-10 font-semibold my-10">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://elements.envato.com/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px] bg-black p-4">
                  <img src={EnvatoLogo} alt="image" className="w-full" />
                </div>

                <li>Envato</li>
              </div>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://mixkit.co/"
            >
              <div className="flex flex-col items-center justify-center gap-4 min-w-[175px] min-h-[185px] hover:scale-105 z-10 p-2 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
                <div className="w-[150px]">
                  <img src={MixkitLogo} alt="image" className="w-full" />
                </div>

                <li>Mixkit</li>
              </div>
            </a>
          </ul>
          <h1 className="text-center bg-bluegradientR bg-clip-text text-transparent italic font-bold text-2xl mt-20">
            UI Inspiration
          </h1>

          <div className="flex flex-col items-center justify-center gap-4 w-fit px-4 py-8 z-10 bg-white border-[2px] border-gray-50 shadow-md shadow-black/40 rounded-lg">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://dribbble.com/shots/25037999-Pipelined-Customer-Relationship-Management-Platform"
            >
              <div className="w-[300px] hover:scale-105">
                <img
                  src={DesignInspirationLogo}
                  alt="image"
                  className="w-full"
                />
              </div>
            </a>

            <div className="text-center flex flex-col gap-4 items-center justify-center">
              <a
                href="https://dribbble.com/Nissaaa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="p-2 hover:scale-105 bg-black text-white font-bold rounded-full w-fit">
                  Ainun Nisa
                </p>
              </a>
              <p>
                Yogyakarta, Indonesia <br /> Web Design, UI / Visual Design,
                Mobile Design
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttributionsPage;
