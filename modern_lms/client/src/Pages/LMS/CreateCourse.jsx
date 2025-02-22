import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backend_API } from "../../Config/Config";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState("");
  const [newLecture, setNewLecture] = useState({ label: "", videoLink: "" });
  const navigate = useNavigate();

  const addModule = () => {
    if (modules.length < 10) {
      setModules([...modules, { moduleTitle: newModule, lectures: [] }]);
      setNewModule("");
    }
  };

  const addLecture = (index) => {
    const linkRegex = /^(http|https|youtu)/;
    if (!linkRegex.test(newLecture.videoLink)) {
      alert(
        "Youtube Video link must be valid i.e. https://youtu.be/... or https://youtube.com/..."
      );
      return;
    }

    if (modules[index].lectures.length < 10) {
      const updatedModules = [...modules];
      updatedModules[index].lectures.push(newLecture);
      setModules(updatedModules);
      setNewLecture({ label: "", videoLink: "" });
    }
  };

  const removeModule = (index) => {
    const updatedModules = modules.filter((_, idx) => idx !== index);
    setModules(updatedModules);
  };

  const removeLecture = (moduleIndex, lectureIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures = updatedModules[
      moduleIndex
    ].lectures.filter((_, idx) => idx !== lectureIndex);
    setModules(updatedModules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${backend_API}/api/courses/add`,
        { title, description, modules },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      navigate("/self-paced-courses");
    } catch (err) {
      console.error("Error adding course", err);
    }
  };

  return (
    <div className="container mx-auto w-fit p-8">
      <h1 className="text-3xl font-bold mb-6">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">
            Course Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 p-3 rounded-md"
            placeholder="Course Title"
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full resize-none border border-gray-300 p-3 rounded-md"
            rows="4"
            placeholder="Course description..."
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Modules</h3>
          <div className="flex gap-4 items-center mb-4">
            <input
              type="text"
              value={newModule}
              onChange={(e) => setNewModule(e.target.value)}
              placeholder="Module Title"
              className="border border-gray-300 p-3 rounded-md flex-grow"
            />
            <button
              type="button"
              onClick={addModule}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"
            >
              Add Module
            </button>
          </div>

          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md mb-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-bold">{module.moduleTitle}</h4>
              </div>

              <div className="flex flex-wrap gap-4 items-center mb-4">
                <input
                  type="text"
                  value={newLecture.label}
                  onChange={(e) =>
                    setNewLecture({ ...newLecture, label: e.target.value })
                  }
                  placeholder="Lecture Label"
                  className="border border-gray-300 p-3 rounded-md flex-grow"
                />
                <input
                  type="url"
                  value={newLecture.videoLink}
                  onChange={(e) =>
                    setNewLecture({ ...newLecture, videoLink: e.target.value })
                  }
                  placeholder="Youtube Video Link Only"
                  className="border border-gray-300 p-3 rounded-md flex-grow"
                />
                <button
                  type="button"
                  onClick={() => addLecture(index)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400"
                >
                  Add Lecture
                </button>
              </div>

              <ul className="space-y-2">
                {module.lectures.map((lecture, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>
                      {lecture.label} -{" "}
                      <a
                        href={lecture.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Watch
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLecture(index, idx)}
                      className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-400"
                    >
                      Remove Lecture
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => removeModule(index)}
                className="bg-red-500 font-bold w-fit mx-auto text-white py-1 px-3 my-4 rounded-md hover:bg-red-400"
              >
                Remove Module
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-400"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
