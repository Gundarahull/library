const Book = require("../models/books.model");
const Borrower = require("../models/borrower.model");
const BorrowerTrans = require("../models/borrowerTrans.model");
const Computer = require("../models/computer.model");

const addBorrowingTrans = async (req, res) => {
  const { book, borrowerId, computer, bookId, computerId } = req.body;
  if (!borrowerId) {
    return res.status(400).json({
      status: false,
      message: "borrowerId Is Required",
      requiredFields: "borrowerId",
    });
  }
  if (book && !bookId) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "bookId",
    });
  }
  if (computer && !computerId) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "computerId",
    });
  }
  try {
    const BorrowerData = await Borrower.findById(borrowerId);
    if (!BorrowerData) {
      return res.status(400).json({
        status: false,
        message: "Borrower Not Found",
      });
    }
    if (book && bookId && !computer) {
      const bookData = await Book.findOne({ _id: bookId, available: true });
      console.log("Book Details", bookData);
      if (!bookData) {
        return res.status(400).json({
          status: false,
          message: "Book Not Found || Taken By SomeOne",
        });
      }
      const borrowerdata = await Borrower.findById(borrowerId);
      console.log("Borrower data", borrowerdata);
      const addTrans = await BorrowerTrans.create({
        borrower: borrowerId,
        checkedOutBooks: bookId,
      });

      //updating the Book
      const updateBook = await Book.findByIdAndUpdate(bookData._id, {
        available: false,
      });
      return res.status(200).json({
        status: true,
        message: "Successfully Borrowed",
        results: {
          name: borrowerdata.name,
          email: borrowerdata.email,
          Book: bookData.title,
          receiptNumber: addTrans._id,
        },
      });
    }
    if (computer && computerId && !book) {
      const computerData = await Computer.findOne({
        _id: computerId,
        available: true,
      });
      if (!computerData) {
        return res.status(400).json({
          status: false,
          message: "Computer Not Found || Taken By SomeOne",
        });
      }
      const addTrans = await BorrowerTrans.create({
        borrower: borrowerId,
        checkedOutComputers: computerId,
      });
      //updating the Book
      const updateBook = await Computer.findByIdAndUpdate(computerData._id, {
        available: false,
      });
      const borrowerdata = await Borrower.findById(borrowerId);
      return res.status(200).json({
        status: true,
        message: "Successfully Borrowed",
        results: {
          name: borrowerdata.name,
          email: borrowerdata.email,
          ComputerModel: computerData.model,
          ComputerBrand: computerData.brand,
          receiptNumber: addTrans._id,
        },
      });
    }
    if (book && bookId && computer && computerId) {
      const computerData = await Computer.findOne({
        _id: computerId,
        available: true,
      });
      console.log("Computer Data in ALL>>>>>>>>>>>>", computerData);
      if (!computerData) {
        return res.status(400).json({
          status: false,
          message: "Computer Not Found || Taken By SomeOne",
        });
      }

      const bookData = await Book.findOne({ _id: bookId, available: true });
      if (!bookData) {
        return res.status(400).json({
          status: false,
          message: "Book Not Found || Taken By SomeOne",
        });
      }
      const borrowerdata = await Borrower.findById(borrowerId);
      const addTrans = await BorrowerTrans.create({
        borrower: borrowerId,
        checkedOutBooks: bookId,
        checkedOutComputers: computerId,
      });
      //updating the Book
      const updateBook = await Book.findByIdAndUpdate(bookData._id, {
        available: false,
      });
      const updateComputer = await Computer.findByIdAndUpdate(
        computerData._id,
        {
          available: false,
        }
      );

      return res.status(200).json({
        status: true,
        message: "Successfully Borrowed",
        results: {
          name: borrowerdata.name,
          email: borrowerdata.email,
          Book: bookData.title,
          ComputerModel: computerData.model,
          ComputerBrand: computerData.brand,
          receiptNumber: addTrans._id,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const allBorrowed = async (req, res) => {
  const { borrowerId } = req.body;
  if (!borrowerId) {
    return res.status(400).json({
      status: false,
      message: "borrowerId Is Required",
      requiredFields: "borrowerId",
    });
  }
  try {
    const borrowerData = await BorrowerTrans.find({ borrower: borrowerId });

    if (!borrowerData) {
      return res.status(400).json({
        status: false,
        message: "Borrower Not Found",
        requiredFields: "borrowerId",
      });
    }
    return res.status(200).json({
      status: true,
      message: "All Borrowed",
      results: borrowerData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const returnBorrowed = async (req, res) => {
  const { receiptId, borrowerId, bookId, computerId } = req.body;
  if (!borrowerId || !receiptId) {
    return res.status(400).json({
      status: false,
      message: "borrowerId,receiptId Is Required",
      requiredFields: "borrowerId,receiptId",
    });
  }
  try {
    const receiptdata = await BorrowerTrans.findById(receiptId);
    if (!receiptdata) {
      return res.status(400).json({
        status: false,
        message: "Receipt Not Found",
        requiredFields: "receiptId",
      });
    }
    const borrowerData = await BorrowerTrans.findOne({
      borrower: borrowerId,
      _id: receiptId,
    });
    if (!borrowerData) {
      return res.status(400).json({
        status: false,
        message: "Borrower Not Found",
        requiredFields: "borrowerId,receiptId",
      });
    }
    console.log("Book Deatils", borrowerData.checkedOutBooks.length);
    console.log("check>>>>>>>>", receiptdata.checkedOutBooks[0]);
    if (borrowerData.checkedOutBooks.length > 0) {
      const conv = String(receiptdata.checkedOutBooks[0]);
      if (conv !== bookId) {
        return res.status(400).json({
          status: false,
          message: " Not The Correct Book man! ITS ANOTHER BOOK",
        });
      }
    }
    if (borrowerData.checkedOutComputers.length > 0) {
      if (receiptdata.checkedOutComputers[0] !== computerId) {
        return res.status(400).json({
          status: false,
          message: " Not The Correct Book man! ITS ANOTHER BOOK",
        });
      }
    }
    console.log("We are here>>>>>>>>>>");
    if (bookId && !computerId) {
      const bookData = await Book.findById(bookId);
      if (!bookData) {
        return res.status(400).json({
          status: false,
          message: "Book Not Found",
          requiredFields: "borrowerId,bookId",
        });
      }
      const updateData = await BorrowerTrans.updateOne(
        {
          borrower: borrowerId,
          _id: receiptId,
        },
        {
          $set: {
            checkedOutBooks: [],
            checkedOutComputers: [],
          },
        }
      );
      const updatedBook = await Book.updateOne(
        { _id: bookId },
        { $set: { available: true } }
      );
      return res.status(200).json({
        status: true,
        message: "Book  Returned Successfully",
      });
    }
    if (computerId && !bookId) {
      const computerData = await Computer.findById(computerId);
      if (!computerData) {
        return res.status(400).json({
          status: false,
          message: "Book Or Computer Not Found",
          requiredFields: "borrowerId,bookId,computerId",
        });
      }

      const updateData = await BorrowerTrans.updateOne(
        {
          borrower: borrowerId,
          _id: receiptId,
        },
        {
          $set: {
            checkedOutBooks: [],
            checkedOutComputers: [],
          },
        }
      );
      //We can include Fine also>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      // const borrowDate=new Date(borrowerData.borrowDate);
      // const returnDate=new Date(borrowerData.returnDate);
      // const diffInMs=returnDate.getTime()-borrowDate.getTime();
      // const diffInDays=Math.ceil(diffInMs/(1000*60*60*24));
      // const fine=diffInDays*10;
      
      const updatedComputer = await Computer.updateOne(
        { _id: computerId },
        { $set: { available: true } }
      );
      return res.status(200).json({
        status: true,
        message: "Computer Returned Successfully",
      });
    }
    if (bookId && computerId) {
      const bookData = await Book.findById(bookId);
      const computerData = await Computer.findById(computerId);
      if (!bookData || !computerData) {
        return res.status(400).json({
          status: false,
          message: "Book Not Found",
          requiredFields: "borrowerId,bookId,computerId",
        });
      }
      const updateData = await BorrowerTrans.updateOne(
        {
          borrower: borrowerId,
          _id: receiptId,
        },
        {
          $set: {
            checkedOutBooks: [],
            checkedOutComputers: [],
          },
        }
      );
      const updatedComputer = await Computer.updateOne(
        { _id: computerId },
        { $set: { available: true } }
      );
      const updatedBook = await Book.updateOne(
        { _id: bookId },
        { $set: { available: true } }
      );
      return res.status(200).json({
        status: true,
        message: "Book And Computer Returned Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  addBorrowingTrans,
  allBorrowed,
  returnBorrowed,
};
