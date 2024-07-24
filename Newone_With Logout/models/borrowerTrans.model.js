const mongoose = require("mongoose");

const BorrowerTransSchema = new mongoose.Schema({
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "Borrower" },
  checkedOutBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  checkedOutComputers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Computer" },
  ],
});

const BorrowerTrans = mongoose.model("BorrowerTrans", BorrowerTransSchema);

module.exports = BorrowerTrans;
