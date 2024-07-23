const Borrower = require("../models/borrower.model");

const postBorrower = async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({
        status: false,
        message: "Please fill all the fields",
        requiredFields: "name, email",
      });
    }
    const alreadyPresent = await Borrower.find({ email: email });
    console.log("Already",alreadyPresent);
    if (alreadyPresent.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Email already present",
      });
    }

    const newBorrower = await Borrower.create({
      name,
      email,
    });
    res.status(201).json({
      status: true,
      message: "New Borrower created successfully",
      data: newBorrower,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const getBorrowers = async (req, res) => {
  try {
    const Borrowers = await Borrower.find();
    res.status(200).json({
      status: true,
      message: "Borrower fetched successfully",
      data: Borrowers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

//get a SIngle book
const getBorrower = async (req, res) => {
  const id = req.params.id;
  console.log("params", req.params.id);
  try {
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid id",
      });
    }
    const BorrowerOne = await Borrower.findById(id);
    res.status(200).json({
      status: true,
      message: "Borrower_One fetched successfully",
      data: BorrowerOne,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};
//update a book
const updateBorrowerOne = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "name, email",
    });
  }
  try {
    const updatedBorrower = await Borrower.findById(id);
    console.log("updated One>>>>>>>>>>>>>>>>>",updatedBorrower);
    updatedBorrower.name = name;
    updatedBorrower.email = email;
    await updatedBorrower.save();
    res.status(200).json({
      status: true,
      message: "BorrowerOne updated successfully",
      data: updatedBorrower,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

//delete a book
const deleteBorrower = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBorrower = await Borrower.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Borrower deleted successfully",
      data: deletedBorrower,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

module.exports = {
  postBorrower,
  getBorrowers,
  getBorrower,
  deleteBorrower,
  updateBorrowerOne,
};
