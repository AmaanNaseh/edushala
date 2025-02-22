import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_API } from "../../Config/Config";
import CourseLogo from "../../Assets/LMS/Course.png";

const UserCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${backend_API}/api/courses/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, [token]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!token) return; // Prevent API call if token is missing
      try {
        const res = await axios.get(`${backend_API}/api/courses/my-courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyCourses(res.data);
      } catch (err) {
        console.error("Error fetching my courses:", err);
      }
    };
    fetchMyCourses();
  }, [token]); // Add token dependency

  return (
    <>
      <div className="m-4 p-4 md:mx-10 md:px-10">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          My Courses
        </h1>
        {myCourses.length === 0 ? (
          <p className="font-semibold text-center my-4">
            Please Enroll in any course
          </p>
        ) : (
          ""
        )}
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_400px))] gap-8">
          {myCourses.map((course) => (
            <Link to={`/user/course-details/${course._id}`}>
              <div
                className="bg-white min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-black border-[1px] shadow-md shadow-black/40 flex flex-col items-center justify-center gap-4"
                key={course._id}
              >
                <div className="w-[150px]">
                  <img src={CourseLogo} alt="..." className="w-full" />
                </div>
                <h3 className="text-xl flex flex-wrap items-center">
                  <span className="font-bold mr-2">Course:</span> {course.title}
                </h3>
                <p className="text-justify">
                  <span className="font-bold mr-2">Description:</span>{" "}
                  {course.description}
                </p>
                <p>
                  <span className="font-semibold mr-2">Uploaded by:</span>
                  {course.adminName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-4 p-4 md:mx-10 md:px-10">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Available Courses
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_400px))] gap-8">
          {courses.map((course) => (
            <Link to={`/user/course-details/${course._id}`}>
              <div
                className="bg-white min-h-[225px] hover:scale-105 cursor-pointer rounded-[10px] py-4 border-black border-[1px] shadow-md shadow-black/40 flex flex-col items-center justify-center gap-4"
                key={course._id}
              >
                <div className="w-[150px]">
                  <img src={CourseLogo} alt="..." className="w-full" />
                </div>
                <h3 className="text-xl flex flex-wrap items-center">
                  <span className="font-bold mr-2">Course:</span> {course.title}
                </h3>
                <p className="text-justify">
                  <span className="font-bold mr-2">Description:</span>{" "}
                  {course.description}
                </p>
                <p>
                  <span className="font-semibold mr-2">Uploaded by:</span>
                  {course.adminName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserCoursesPage;
