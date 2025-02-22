import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookLogo from "../../Assets/ElibraryPage/Book.png";
import { backend_API } from "../../Config/Config";

const BookCreate = () => {
  const [bookname, setBookName] = useState("");
  const [booksubject, setBookSubject] = useState("");
  const [booklink, setBookLink] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createBook = async () => {
    if (!bookname || !booksubject || !booklink) {
      alert("All fields are required!");
      return;
    }

    const linkRegex = /^(http|https|www)/;
    if (!linkRegex.test(booklink)) {
      alert("Book link must contain 'www' or 'http'.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${backend_API}/api/books`,
        { bookname, booksubject, booklink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Book Created Successfully");
      navigate("/e-library");
    } catch (err) {
      console.error("Error creating book:", err.response?.data || err.message);
      alert("Failed to create book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto gap-6 my-10 p-8 rounded-lg bg-[#F2EFE7] shadow-lg w-fit">
      <img src={BookLogo} alt="book" className="w-[100px] my-4" />
      <input
        type="text"
        placeholder="Enter Book Name"
        value={bookname}
        onChange={(e) => setBookName(e.target.value)}
        className="border px-4 py-2 bg-[#FBFBFB] border-black w-full"
      />
      <input
        type="text"
        placeholder="Enter Book Subject"
        value={booksubject}
        onChange={(e) => setBookSubject(e.target.value)}
        className="border px-4 py-2 bg-[#FBFBFB] border-black w-full"
      />
      <input
        type="text"
        placeholder="Enter Book's Link"
        value={booklink}
        onChange={(e) => setBookLink(e.target.value)}
        className="border px-4 py-2 bg-[#FBFBFB] border-black w-full"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
        onClick={createBook}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Book"}
      </button>
    </div>
  );
};

export default BookCreate;
