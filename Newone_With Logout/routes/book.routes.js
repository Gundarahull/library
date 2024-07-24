const express = require("express");
const {
  postBooks,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.post("/add", postBooks);

router.get("/get", getBooks);
router.get("/singleBook/:id", getBook);

router.patch("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
