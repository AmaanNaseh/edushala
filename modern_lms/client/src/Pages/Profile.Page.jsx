import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backend_API } from "../Config/Config";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    userFullName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${backend_API}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${backend_API}/api/users/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Account deleted successfully");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (err) {
      console.error("Failed to delete account:", err);
      alert("Failed to delete account");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateAccount = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(`${backend_API}/api/users/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Account updated successfully");
      fetchUserProfile();
    } catch (err) {
      console.error("Failed to update account:", err);
      alert("Failed to update account");
    }
  };

  return (
    <div className="p-6 space-y-4 md:mx-12 lg:mx-32">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        Welcome, {user.userFullName}
      </h1>
      <div className="flex flex-col lg:flex-row flex-wrap items-center lg:items-start justify-center gap-8 lg:gap-40 py-10 px-4 rounded-md shadow-lg shadow-black/50 bg-[#F5F5F5]">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-center my-4 font-bold">
            Account details
          </h2>
          <p className="text-lg">Full Name: {user.userFullName}</p>
          <p className="text-lg">Username: {user.username}</p>
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-lg">Role: {user.role}</p>
          <button
            className="bg-red-600 text-white font-bold px-7 py-2 my-4 rounded-lg w-fit mx-auto hover:cursor-pointer hover:scale-105 hover:bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="space-y-2 flex flex-col gap-4">
          <h2 className="text-2xl text-center my-4 font-bold">
            Update Account details
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label>Full Name:</label>
            <input
              type="text"
              name="userFullName"
              value={formData.userFullName}
              onChange={handleInputChange}
              placeholder="Update Full Name"
              className="p-2 border-[2px] border-black"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Update Username"
              className="p-2 border-[2px] border-black"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Update Password"
              className="p-2 border-[2px] border-black"
            />
          </div>
          <button
            onClick={handleUpdateAccount}
            className="mt-2 bg-bluegradientR text-white font-bold px-5 py-2 w-fit mx-auto rounded-lg hover:cursor-pointer hover:scale-105"
          >
            Update Account
          </button>
        </div>

        <div className="space-y-2 flex flex-col gap-4">
          <h2 className="text-2xl text-center my-4 font-bold">
            Delete Account
          </h2>
          <button
            className="bg-red-600 text-white font-bold px-7 py-2 my-4 rounded-lg w-fit mx-auto hover:cursor-pointer hover:scale-105 hover:bg-red-500"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
