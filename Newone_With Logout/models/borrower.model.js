const mongoose = require("mongoose");

const BorrowerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Borrower = mongoose.model("Borrower", BorrowerSchema);

module.exports = Borrower;
