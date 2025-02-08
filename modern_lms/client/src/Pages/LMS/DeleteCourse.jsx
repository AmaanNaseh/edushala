import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { backend_API } from "../../Config/Config";

const DeleteCourse = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${backend_API}/api/courses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully");
      navigate("/self-paced-courses");
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-bold">
        Are you sure you want to delete this course?
      </h1>
      <button
        className="px-4 py-2 rounded-md bg-red-600 hover:scale-105 hover:bg-red-500 font-bold text-white"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Course"}
      </button>
    </div>
  );
};

export default DeleteCourse;
