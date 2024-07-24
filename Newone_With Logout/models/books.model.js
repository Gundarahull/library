const mongoose = require("mongoose");

//Creating Schema
//here we can add Quantity also it will be so easy 
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
