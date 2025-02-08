import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BookLogo from "../../Assets/ElibraryPage/Book.png";
import { backend_API } from "../../Config/Config";

const BookDelete = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getBook = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBook(response.data.selectedBook);
    } catch (err) {
      console.error("Error fetching book:", err.response?.data || err.message);
      alert("Failed to fetch book data.");
    }
  };

  useEffect(() => {
    getBook();
  }, [id]);

  const deleteBook = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(`${backend_API}/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book Deleted Successfully");
      navigate("/e-library");
    } catch (err) {
      console.error("Error deleting book:", err.response?.data || err.message);
      alert("Failed to delete book.");
    }
  };

  return (
    <>
      {book ? (
        <div className=" rounded-lg bg-[#F2EFE7] mx-auto p-8 shadow-black/40 shadow-md w-fit py-8 my-10 flex flex-col items-center gap-4 min-w-[250px] max-w-[300px] md:max-w-[450px] lg:max-w-[700px]">
          <div className="w-[100px] mx-auto my-4">
            <img src={BookLogo} alt="book" className="w-full" />
          </div>
          <h3 className="text-2xl">
            <span className="font-semibold mx-1">Name:</span> {book.bookname}
          </h3>
          <h3 className="text-2xl">
            <span className="font-semibold mx-1">Subject:</span>{" "}
            {book.booksubject}
          </h3>
          <h3 className="text-2xl">
            <span className="font-semibold mx-1">Uploaded by:</span>{" "}
            {book.adminName}
          </h3>
          <button
            className="bg-[#F93827] hover:scale-105 text-white font-semibold mx-auto w-fit px-3 py-1 rounded-[5px] text-2xl hover:bg-[#FA5D4F]"
            onClick={deleteBook}
          >
            Delete Book
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default BookDelete;
