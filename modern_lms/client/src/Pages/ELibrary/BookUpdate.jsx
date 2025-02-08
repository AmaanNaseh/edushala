import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BookLogo from "../../Assets/ElibraryPage/Book.png";
import { backend_API } from "../../Config/Config";

const BookUpdate = () => {
  const [oldBook, setOldBook] = useState(null);
  const [bookname, setBookName] = useState("");
  const [booksubject, setBookSubject] = useState("");
  const [booklink, setBookLink] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getBook = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOldBook(response.data.selectedBook);
    } catch (err) {
      console.error("Error fetching book:", err.response?.data || err.message);
      alert("Failed to fetch book data.");
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  const updateBook = async () => {
    const token = localStorage.getItem("authToken");

    const updatedBook = {
      bookname: bookname || oldBook.bookname,
      booksubject: booksubject || oldBook.booksubject,
      booklink: booklink || oldBook.booklink,
    };

    try {
      await axios.put(`${backend_API}/api/books/${id}`, updatedBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book Updated Successfully");
      navigate("/e-library");
    } catch (err) {
      console.error("Error updating book:", err.response?.data || err.message);
      alert("Failed to update book.");
    }
  };

  return (
    <>
      {oldBook ? (
        <div className="flex flex-col items-center mx-auto gap-10 my-10 rounded-lg bg-[#F2EFE7] p-8 shadow-black/40 shadow-md w-fit">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[100px] mx-auto my-4">
              <img src={BookLogo} alt="book" className="w-full" />
            </div>
            <label className="font-semibold">Enter Book Name</label>
            <input
              type="text"
              value={bookname}
              placeholder={oldBook.bookname}
              onChange={(e) => setBookName(e.target.value)}
              className="border-[1px] px-4 py-1 bg-[#FBFBFB] border-black"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="font-semibold">Enter Book Subject</label>
            <input
              type="text"
              value={booksubject}
              placeholder={oldBook.booksubject}
              onChange={(e) => setBookSubject(e.target.value)}
              className="border-[1px] px-4 py-1 bg-[#FBFBFB] border-black"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <label className="font-semibold">Enter Book's Link</label>
            <input
              type="text"
              value={booklink}
              placeholder={oldBook.booklink}
              onChange={(e) => setBookLink(e.target.value)}
              className="border-[1px] px-4 py-1 bg-[#FBFBFB] border-black"
            />
          </div>
          <button
            className="bg-bluegradientR hover:scale-105 text-white font-semibold mx-auto w-fit px-3 py-1 rounded-[5px] text-2xl"
            onClick={updateBook}
          >
            Update
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BookUpdate;
