import React from "react";
import { Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import Brochure from "../../Assets/BrochurePage/Brochure.pdf";

const Footer = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "8cad7eaf-eddb-494f-9a6c-97cef3d3eeb7");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Email Sent Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <footer className="sticky mt-20 h-full rounded-t-[20px] lg:mx-8 px-4 bottom-0 left-0 bg-footerGradient flex flex-col gap-4 items-center justify-evenly">
        <ul className="inline-flex gap-4 flex-wrap list-none text-white font-semibold my-6">
          <Link to={"/attributions"}>
            <li className="hover:scale-105">Attributions</li>
          </Link>
          <Link to={"/shortcuts"}>
            <li className="hover:scale-105">Shortcuts</li>
          </Link>
          <a href={Brochure} download>
            <li className="hover:scale-105">Brochure</li>
          </a>
          <Link to={"/about"}>
            <li className="hover:scale-105">About</li>
          </Link>
          <a
            href="https://github.com/AmaanNaseh/edushala"
            target="_blank"
            rel="noreferrer"
          >
            <li className="hover:scale-105">GitHub repo</li>
          </a>
        </ul>
        <div className="my-4">
          <div className="relative mb-8 min-h-[75px] max-w-[200px] bg-[#85b0ec] py-1 mx-auto">
            <div
              className="absolute left-[50%] translate-x-[-50%]"
              id="google_translate_element"
            ></div>
          </div>
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl text-center">
            Stay Connected
          </h1>
          <form
            onSubmit={onSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 text-sm lg:text-lg lg:gap-20 my-4 md:my-8"
          >
            <div className="flex gap-4 items-center justify-center text-white">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                className="bg-[#85b0ec] text-[12px] ml-5 w-[225px] px-4 py-2 border-[2px] border-[#3f74c2] rounded-full outline-[#3f74c2]"
                type="email"
                name="email"
                id="email"
                required
              />
            </div>
            <div className="flex gap-4 items-center text-white justify-center">
              <label htmlFor="message" className="font-bold">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="resize-none text-[12px] bg-[#85b0ec] px-4 py-2 border-[2px] border-[#3f74c2] rounded-lg outline-[#3f74c2]"
                required
              ></textarea>
            </div>

            <button
              className="bg-transparent border-[2px] border-[#85b0ec] hover:bg-[#85b0ec] p-2 md:px-4 md:py-2 md:text-sm lg:text-lg rounded-full text-white font-bold flex items-center gap-2"
              type="submit"
            >
              Send
              <span className="text-2xl">
                <IoMdSend />
              </span>
            </button>
          </form>
          <p className="text-center text-white">{result}</p>
        </div>

        <p className="text-center text-white mb-2">
          @{new Date().getFullYear()} All rights reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;
