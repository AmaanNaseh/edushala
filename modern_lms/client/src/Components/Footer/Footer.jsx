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
      <footer className="mt-20 h-full rounded-t-[20px] lg:mx-8 p-4 pt-16 bottom-0 left-0 bg-footerGradient text-white">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center md:items-start md:justify-evenly">
          {/* Description */}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">EduShala</h1>
            <p className="md:max-w-[300px] lg:max-w-[450px] text-justify">
              Empowering learners worldwide with accessible, high-quality
              education. Join our community and start your learning journey
              today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Quick Links</h1>
            <ul className="flex flex-col gap-4 text-sm">
              <Link to={"/about"}>
                <li className="hover:underline">About</li>
              </Link>
              <Link to={"/attributions"}>
                <li className="hover:underline">Attributions</li>
              </Link>
              <Link to={"/shortcuts"}>
                <li className="hover:underline">Shortcuts</li>
              </Link>

              <a href={Brochure} download>
                <li className="hover:underline">Brochure</li>
              </a>

              <a
                href="https://github.com/AmaanNaseh/edushala"
                target="_blank"
                rel="noreferrer"
              >
                <li className="hover:underline">GitHub repo</li>
              </a>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold">Stay Connected</h1>
            <form
              onSubmit={onSubmit}
              className="flex flex-col items-center justify-center text-sm gap-4 text-black"
            >
              <input
                className="px-4 py-2 w-full text-black"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />

              <textarea
                name="message"
                id="message"
                className="resize-none px-4 py-2 w-full text-black"
                placeholder="Message"
                required
              ></textarea>

              <button
                className="rounded-full border-[2px] border-white text-white hover:bg-white hover:text-[#1674c9] text-2xl p-2"
                type="submit"
              >
                <IoMdSend />
              </button>
            </form>
            <p className="text-center">{result}</p>
          </div>
        </div>

        <div className="my-8 h-[1px] w-full lg:w-[80%] bg-white mx-auto"></div>

        <p className="text-center">
          &copy; {new Date().getFullYear()} | All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
