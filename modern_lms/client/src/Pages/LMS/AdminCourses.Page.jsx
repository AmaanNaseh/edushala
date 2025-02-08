import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backend_API } from "../../Config/Config";
import CourseLogo from "../../Assets/LMS/Course.png";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const AdminCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${backend_API}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAdmin(res.data.role === "admin");
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (isAdmin) {
          const courseRes = await axios.get(
            `${backend_API}/api/courses/admin-courses`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCourses(courseRes.data);
        } else {
          const courseRes = await axios.get(`${backend_API}/api/courses/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCourses(courseRes.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    if (isAdmin !== false) {
      fetchCourses();
    }
  }, [isAdmin, token]);

  return (
    <div className="m-4 p-4 md:mx-10 md:px-10">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        {isAdmin ? "Admin Courses" : "Available Courses"}
      </h1>
      <div className="my-4">
        {isAdmin && (
          <Link
            to="/admin/create-course"
            className="bg-bluegradientR text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105"
          >
            Add New Course
          </Link>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_400px))] gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white min-h-[225px] rounded-[10px] py-4 border-black border-[1px] shadow-md shadow-black/40 flex flex-col items-center justify-center gap-4"
          >
            <div className="w-[150px]">
              <img src={CourseLogo} alt="..." className="w-full" />
            </div>
            <h3 className="text-xl">
              <span className="font-semibold mr-2">Course Name:</span>{" "}
              {course.title}
            </h3>
            <p className="text-justify">
              <span className="text-xl font-semibold mr-2">Description:</span>{" "}
              {course.description}
            </p>
            {isAdmin ? (
              <>
                <Link
                  to={`/admin/get-course/${course._id}`} // Link to GetCourse page
                  className="text-green-500 font-bold text-lg"
                >
                  View Details
                </Link>

                <div className="flex flex-wrap gap-10">
                  <Link to={`/admin/update-course/${course._id}`}>
                    <FaPencilAlt className="text-2xl text-orange-500" />
                  </Link>
                  <Link to={`/admin/delete-course/${course._id}`}>
                    <FaTrash className="text-2xl text-red-500" />
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCoursesPage;
