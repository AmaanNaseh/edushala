const BookModel = require("../models/bookModel");
const UserModel = require("../models/userModel"); // Import UserModel for admin name

/*
ROUTE           /api/books
DESCRIPTION     Get All Books
PARAMETERS      NONE
METHOD          GET
ACCESS          PRIVATE
*/

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find(); // Remove userId filter to show all books
    res.status(200).json({ allBooks: books });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/*
ROUTE           /api/books/:id
DESCRIPTION     Get a book based on id
PARAMETERS      id
METHOD          GET
ACCESS          PRIVATE
*/

const getBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ selectedBook: book });
  } catch (err) {
    console.error("Error fetching book:", err.message);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

// Create a new book
/*
ROUTE           /api/books
DESCRIPTION     Create a book
PARAMETERS      NONE
METHOD          POST
ACCESS          PRIVATE
*/

const createBook = async (req, res) => {
  try {
    const { bookname, booksubject, booklink } = req.body;
    if (!bookname || !booksubject || !booklink) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch the admin's full name
    const admin = await UserModel.findById(req.user.userId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const adminName = admin.userFullName; // Admin's name

    const newBook = new BookModel({
      bookname,
      booksubject,
      booklink,
      userId: req.user.userId,
      adminName, // Add adminName
    });

    await newBook.save();
    res.status(201).json({ message: "Book created successfully", newBook });
  } catch (err) {
    console.error("Error creating book:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/*
ROUTE           /api/books/:id
DESCRIPTION     Update a book based on id
PARAMETERS      id
METHOD          PUT
ACCESS          PRIVATE
*/

const updateBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this book" });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).json({ error: err.message });
  }
};

/*
ROUTE           /api/books/:id
DESCRIPTION     Delete a book based on id
PARAMETERS      id
METHOD          DELETE
ACCESS          PRIVATE
*/

const deleteBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this book" });
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).json({ message: "Failed to delete book" });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
