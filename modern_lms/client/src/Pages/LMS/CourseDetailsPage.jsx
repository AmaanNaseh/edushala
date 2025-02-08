import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backend_API } from "../../Config/Config";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await axios.get(
          `${backend_API}/api/courses/get-course/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="m-4 p-4 md:m-10 md:p-10 my-10 min-h-[75vh]">
      {/* Course Title and Description */}
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-2xl font-semibold text-center">{course.title}</h3>
        <div className="flex flex-col gap-2 items-center justify-center">
          <span className="text-xl font-semibold">Description:</span>
          <p className="text-justify">{course.description}</p>
        </div>
        <p>
          <span className="font-semibold mr-2">Uploaded by:</span>
          {course.adminName}
        </p>
      </div>

      {/* Modules */}
      <div>
        <h3 className="text-xl font-bold mb-4">Modules</h3>
        <div className="flex flex-wrap gap-6">
          {course.modules.map((module, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 bg-gray-100 rounded-md shadow-md w-full md:w-1/2 lg:w-1/3"
            >
              {/* Module Title */}
              <h4 className="text-xl font-semibold text-center">
                {module.moduleTitle}
              </h4>

              {/* List of Lectures */}
              <ul className="list-disc pl-5">
                {module.lectures.map((lecture, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span>{lecture.label} :</span>
                    <a
                      href={lecture.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Watch
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
