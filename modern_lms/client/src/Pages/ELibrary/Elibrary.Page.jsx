import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_API } from "../../Config/Config";

import { booksDataset } from "../../Datasets/BooksDataset";
import BookLogo from "../../Assets/ElibraryPage/Book.png";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ElibraryPage = () => {
  const [books, setBooks] = useState([]);
  const role = localStorage.getItem("role");

  const getBooks = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${backend_API}/api/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data.allBooks);
    } catch (err) {
      console.error("Error fetching books:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  console.log(books);

  return (
    <>
      <div className="m-4 md:m-8 p-8">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Our Books Gallery
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-8">
          {booksDataset.map((book, key) => {
            return (
              <div
                key={key}
                className="my-[10px] mx-2 flex flex-col flex-wrap gap-2 rounded-lg bg-[#F2EFE7] p-4 shadow-black/40 shadow-md"
              >
                <div className="w-[100px] mx-auto my-2">
                  <img src={book.image} alt="book" className="w-full" />
                </div>
                <h3>
                  <span className="font-semibold">Name:</span> {book.name}
                </h3>
                <h3>
                  <span className="font-semibold">Class:</span> {book.class}
                </h3>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bluegradientR hover:scale-105 text-white font-semibold mx-auto w-fit px-3 py-1 rounded-[36px]"
                >
                  Download
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative m-4 md:m-8 p-8">
        <h1 className="font-bold italic text-2xl md:text-3xl lg:text-5xl bg-bluegradientR bg-clip-text text-transparent text-center my-4 md:my-7">
          Users Gallery
        </h1>
        {role === "admin" ? (
          <Link to={"/api/create-book"}>
            <button className="text-white py-2 px-4 font-bold rounded-[12px] bg-black hover:scale-105 hover:bg-black/75 mx-auto my-8 w-fit">
              Create New Book
            </button>
          </Link>
        ) : (
          ""
        )}

        <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] md:grid-cols-[repeat(auto-fit,_minmax(200px,_400px))] gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="my-[10px] mx-2 flex flex-col flex-wrap items-center  gap-4 rounded-lg bg-[#F2EFE7] p-4 shadow-black/40 shadow-md"
            >
              <div className="w-[100px] mx-auto my-2">
                <img src={BookLogo} alt="book" className="w-full" />
              </div>

              <h3>
                <span className="font-semibold mr-2">Name:</span>
                {book.bookname}
              </h3>
              <h3>
                <span className="font-semibold mr-2">Uploaded by:</span>
                {book.adminName}
              </h3>
              <Link to={`/api/book/${book._id}`}>
                <button className="bg-bluegradientR hover:scale-105 text-white font-semibold mx-auto w-fit px-3 py-1 rounded-[36px]">
                  View Book
                </button>
              </Link>
              {role === "admin" && (
                <div className="flex flex-wrap gap-10">
                  <Link to={`/api/update-book/${book._id}`}>
                    <FaPencilAlt className="text-2xl text-orange-500" />
                  </Link>
                  <Link to={`/api/delete-book/${book._id}`}>
                    <FaTrash className="text-2xl text-red-500" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ElibraryPage;
