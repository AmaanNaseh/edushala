import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScoreAnalysisPage = () => {
  const [subjects, setSubjects] = useState([
    { name: "", totalMarks: "", obtainedMarks: "" },
    { name: "", totalMarks: "", obtainedMarks: "" },
    { name: "", totalMarks: "", obtainedMarks: "" },
    { name: "", totalMarks: "", obtainedMarks: "" },
    { name: "", totalMarks: "", obtainedMarks: "" },
  ]);

  const [totalPercentage, setTotalPercentage] = useState(0);

  const addSubject = () => {
    if (subjects.length < 10) {
      setSubjects([
        ...subjects,
        { name: "", totalMarks: "", obtainedMarks: "" },
      ]);
    } else {
      toast.error("Maximum limit of 10 subjects reached.", {
        position: "bottom-left",
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    if (value < 0) {
      toast.error("Negative marks are not allowed.", {
        position: "bottom-left",
      });
      return;
    }

    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);

    const totalMarks = updatedSubjects.reduce(
      (acc, subject) => acc + Number(subject.totalMarks || 0),
      0
    );
    const obtainedMarks = updatedSubjects.reduce(
      (acc, subject) => acc + Number(subject.obtainedMarks || 0),
      0
    );

    if (totalMarks > 0) {
      setTotalPercentage(((obtainedMarks / totalMarks) * 100).toFixed(2));
    } else {
      setTotalPercentage(0);
    }
  };

  return (
    <>
      <div className="p-4 m-4 md:m-10">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Score Analysis
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-[8px] md:text-[16px] border-collapse border-[2px] border-black">
            <thead>
              <tr>
                <th className="border-[2px] border-black px-2 md:px-4 py-2">
                  Subject
                </th>
                <th className="border-[2px] border-black px-2 md:px-4 py-2">
                  Total Marks
                </th>
                <th className="border-[2px] border-black px-2 md:px-4 py-2">
                  Obtained Marks
                </th>
                <th className="border-[2px] border-black px-2 md:px-4 py-2">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const subjectPercentage =
                  subject.totalMarks && subject.obtainedMarks
                    ? (
                        (Number(subject.obtainedMarks) /
                          Number(subject.totalMarks)) *
                        100
                      ).toFixed(2)
                    : 0;

                return (
                  <tr key={index}>
                    <td className="border-[2px] border-black px-2 md:px-4 py-2">
                      <input
                        type="text"
                        placeholder="Subject Name"
                        value={subject.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        className="w-full p-2 border-[2px] border-black"
                      />
                    </td>
                    <td className="border-[2px] border-black px-2 md:px-4 py-2">
                      <input
                        type="number"
                        placeholder="Total Marks"
                        value={subject.totalMarks}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "totalMarks",
                            Math.max(0, e.target.value)
                          )
                        }
                        className="w-full p-2 border-[2px] border-black"
                      />
                    </td>
                    <td className="border-[2px] border-black px-2 md:px-4 py-2">
                      <input
                        type="number"
                        placeholder="Obtained Marks"
                        value={subject.obtainedMarks}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "obtainedMarks",
                            Math.max(0, e.target.value)
                          )
                        }
                        className="w-full p-2 border-[2px] border-black"
                      />
                    </td>
                    <td className="border-[2px] border-black px-2 md:px-4 py-2 text-center">
                      {subjectPercentage}%
                    </td>
                  </tr>
                );
              })}
              <tr className="font-bold">
                <td className="border-[2px] border-black px-2 md:px-4 py-2 text-right">
                  Total
                </td>
                <td className="border-[2px] border-black px-2 md:px-4 py-2 text-center">
                  {subjects.reduce(
                    (acc, subject) => acc + Number(subject.totalMarks || 0),
                    0
                  )}
                </td>
                <td className="border-[2px] border-black px-2 md:px-4 py-2 text-center">
                  {subjects.reduce(
                    (acc, subject) => acc + Number(subject.obtainedMarks || 0),
                    0
                  )}
                </td>
                <td className="border-[2px] border-black px-2 md:px-4 py-2 text-center">
                  {totalPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mx-8 my-3">
          <button
            onClick={addSubject}
            className="bg-bluegradientR text-[12px] md:text-[18px] text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded-md hover:scale-105 disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
            disabled={subjects.length >= 10}
          >
            Add Subject
          </button>
        </div>
      </div>

      <ToastContainer position="bottom-left" />
    </>
  );
};

export default ScoreAnalysisPage;
