import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSignupLogo from "../../Assets/LoginSignupPages/LoginSignupLogo.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import { backend_API } from "../../Config/Config";

const LoginPage = () => {
  const [psdType, setPsdType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(`${backend_API}/api/users/login`, {
        email,
        password,
      });

      // Store token and role
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/profile");
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message || "Invalid login credentials"
          : "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="m-4 md:m-7 lg:m-10 py-10 flex flex-col gap-10 md:flex-row items-center md:justify-evenly">
      <div className="w-[300px] md:w-[400px] lg:w-[500px]">
        <img src={LoginSignupLogo} alt="Logo" className="w-full" />
      </div>
      <div>
        <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-6xl italic my-4 lg:mb-10">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-lg">
          <label className="my-1">Email</label>
          <input
            type="email"
            className="border-[#2563eb] border-[2px] w-[275px] p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="my-1">Password</label>
          <div className="relative">
            <input
              className="border-[#2563eb] border-[2px] w-[275px] p-1"
              type={psdType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {psdType === "password" ? (
              <BsEye
                onClick={() => setPsdType("text")}
                className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
              />
            ) : (
              <BsEyeSlash
                onClick={() => setPsdType("password")}
                className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
              />
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-bluegradientR text-white font-semibold mx-auto my-4 w-fit px-4 py-1 rounded-[6px]"
          >
            Submit
          </button>
        </form>
        <p className="font-medium mt-2 ml-1">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="border-b-2 border-black text-[#2563eb] font-semibold"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
