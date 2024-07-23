const Book = require("../models/books.model");

const postBooks = async (req, res) => {
  const { title, author, publishedYear } = req.body;
  try {
    if (!title || !author || !publishedYear) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields",
        requiredFields: "title, author, publishedYear",
      });
    }

    const newBook = await Book.create({
      title,
      author,
      publishedYear,
    });
    res.status(201).json({
      status: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ available: true });
    res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

//get a SIngle book
const getBook = async (req, res) => {
  const id = req.params.id;
  console.log("params", req.params.id);
  try {
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid id",
      });
    }
    const book = await Book.findById(id);
    res.status(200).json({
      status: true,
      message: "Book fetched successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};
//update a book
const updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, publishedYear } = req.body;
  if (!title || !author || !publishedYear) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "title, author, publishedYear",
    });
  }
  try {
    const book = await Book.findById(id);
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    await book.save();
    res.status(200).json({
      status: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

module.exports = {
  postBooks,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
};
