import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CGPACalculatorPage = () => {
  const [subjects, setSubjects] = useState([
    { name: "", credit: "", marks: "" },
    { name: "", credit: "", marks: "" },
    { name: "", credit: "", marks: "" },
    { name: "", credit: "", marks: "" },
    { name: "", credit: "", marks: "" },
  ]);

  const [cgpa, setCgpa] = useState(0);

  const addSubject = () => {
    if (subjects.length < 15) {
      setSubjects([...subjects, { name: "", credit: "", marks: "" }]);
    } else {
      toast.error("Maximum limit of 15 subjects reached.", {
        position: "bottom-left",
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    if (value < 0) {
      toast.error("Negative values are not allowed.", {
        position: "bottom-left",
      });
      return;
    }

    if (field === "marks" && value > 100) {
      toast.error("Obtained marks cannot exceed 100.", {
        position: "bottom-left",
      });
      return;
    }

    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const calculateGradePoint = (marks) => {
    if (marks >= 90) return 10;
    if (marks >= 75) return 9;
    if (marks >= 65) return 8;
    if (marks >= 55) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;
    return 0;
  };

  useEffect(() => {
    let totalCredits = 0;
    let weightedGradePoints = 0;

    subjects.forEach((subject) => {
      const credit = Number(subject.credit);
      const marks = Number(subject.marks);
      const gradePoint = calculateGradePoint(marks);

      totalCredits += credit;
      weightedGradePoints += credit * gradePoint;
    });

    if (totalCredits > 0) {
      setCgpa((weightedGradePoints / totalCredits).toFixed(2));
    } else {
      setCgpa(0);
    }
  }, [subjects]);

  return (
    <div className="p-4 m-4 md:m-10">
      <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
        CGPA Calculator
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full  text-[8px] md:text-[16px] border-collapse border-[2px] border-black">
          <thead>
            <tr>
              <th className="border-[2px] border-black px-2 md:px-4 py-2">
                Subject
              </th>
              <th className="border-[2px] border-black px-2 md:px-4 py-2">
                Credits
              </th>
              <th className="border-[2px] border-black px-2 md:px-4 py-2">
                Obtained Marks (out of 100)
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
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
                    placeholder="Credits"
                    value={subject.credit}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "credit",
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
                    value={subject.marks}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "marks",
                        Math.max(0, e.target.value)
                      )
                    }
                    className="w-full p-2 border-[2px] border-black"
                  />
                </td>
              </tr>
            ))}
            <tr className="font-bold">
              <td
                className="border-[2px] border-black px-2 md:px-4 py-2 text-right"
                colSpan={2}
              >
                CGPA
              </td>
              <td className="border-[2px] border-black px-2 md:px-4 py-2 text-center">
                {cgpa}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-8 my-3">
        <button
          onClick={addSubject}
          className="bg-bluegradientR text-[12px] md:text-[18px] text-white font-semibold px-3 py-1 md:px-4 md:py-2 rounded hover:scale-105 disabled:bg-gray-300 disabled:text-black disabled:cursor-not-allowed"
          disabled={subjects.length >= 15}
        >
          Add Subject
        </button>
      </div>

      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default CGPACalculatorPage;
