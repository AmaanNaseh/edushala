import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSignupLogo from "../../Assets/LoginSignupPages/LoginSignupLogo.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "axios";
import { backend_API } from "../../Config/Config";

const SignupPage = () => {
  const [psdType, setPsdType] = useState("password");
  const [username, setUsername] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role as 'user'
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData = { username, userFullName, email, password, role };

    try {
      const response = await axios.post(
        `${backend_API}/api/users/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="m-4 md:m-7 lg:m-10 py-10 flex flex-col gap-10 md:flex-row items-center md:justify-evenly">
      <div className="w-[300px] md:w-[400px] lg:w-[500px]">
        <img src={LoginSignupLogo} alt="Logo" className="w-full" />
      </div>
      <div>
        <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-6xl italic my-4 lg:mb-10">
          Signup
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-lg">
          <label className="my-1">Role</label>
          <select
            className="border-[#2563eb] border-[2px] w-[275px] p-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <label className="my-1">Username</label>
          <input
            type="text"
            className="border-[#2563eb] border-[2px] w-[275px] p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="my-1">Full Name</label>
          <input
            type="text"
            className="border-[#2563eb] border-[2px] w-[275px] p-1"
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
            required
          />

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

          <label className="my-1">Confirm Password</label>
          <div className="relative">
            <input
              className="border-[#2563eb] border-[2px] w-[275px] p-1"
              type={psdType}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="border-b-2 border-black text-[#2563eb] font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
