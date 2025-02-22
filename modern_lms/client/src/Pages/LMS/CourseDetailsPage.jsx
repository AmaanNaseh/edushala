import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backend_API } from "../../Config/Config";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLecture, setCurrentLecture] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

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
        setIsEnrolled(res.data.isEnrolled); // Ensure backend sends enrollment status
      } catch (err) {
        console.error("Error fetching course data:", err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backend_API}/api/courses/enroll`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEnrolled(true);
      alert(res.data.message);
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Enrollment failed");
    }
  };

  const handleUnenroll = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${backend_API}/api/courses/unenroll`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEnrolled(false);
      alert(res.data.message);
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert("Unenrollment failed");
    }
  };

  const extractVideoID = (url) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : ""; // Returns the video ID or an empty string
  };

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
        {/* Enrollment Buttons */}
        {isEnrolled === false && (
          <button
            className="px-6 py-2 mt-4 text-white font-bold rounded-md bg-bluegradientR hover:scale-105"
            onClick={handleEnroll}
          >
            Enroll
          </button>
        )}
        {isEnrolled === true && (
          <button
            className="px-6 py-2 mt-4 text-white font-bold rounded-md bg-red-700 hover:bg-red-600 hover:scale-105"
            onClick={handleUnenroll}
          >
            Unenroll
          </button>
        )}
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
              <h4 className="text-xl font-semibold text-center">
                {module.moduleTitle}
              </h4>
              <ul className="list-disc pl-5">
                {module.lectures.map((lecture, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span>{lecture.label} :</span>
                    <p
                      onClick={() => setCurrentLecture(lecture.videoLink)}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      Watch
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="my-10">
          <iframe
            className="w-full h-full min-w-[300px] min-h-[200px] md:min-w-[500px] md:min-h-[350px] lg:min-h-[625px] my-[15px]"
            src={`https://www.youtube.com/embed/${extractVideoID(
              currentLecture
            )}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
