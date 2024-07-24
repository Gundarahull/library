const Computer = require("../models/computer.model");

const addComputer = async (req, res) => {
  const { brand, model } = req.body;
  if (!brand || !model) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "brand,model",
    });
  }
  try {
    const newComputer = await Computer.create({
      brand,
      model,
    });
    return res.status(201).json({
      status: true,
      message: "Computer added successfully",
      date: newComputer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const getComputers = async (req, res) => {
  try {
    const computers = await Computer.find({ available: true });
    res.status(200).json({
      status: true,
      message: "Computers fetched successfully",
      data: computers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

//get a SIngle Computer
const getComputer = async (req, res) => {
  const id = req.params.id;
  console.log("params", req.params.id);
  try {
    if (!id) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid id",
      });
    }
    const Computerdetails = await Computer.findById(id);
    res.status(200).json({
      status: true,
      message: "Computer fetched successfully",
      data: Computerdetails,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const updateComputer = async (req, res) => {
  const id = req.params.id;
  const { brand, model } = req.body;
  if (!brand || !model) {
    return res.status(400).json({
      status: false,
      message: "Please fill all the fields",
      requiredFields: "brand,model",
    });
  }
  try {
    const ComputerNew = await Computer.findById(id);
    ComputerNew.brand = brand;
    ComputerNew.model = model;
    await ComputerNew.save();
    res.status(200).json({
      status: true,
      message: "Computer updated successfully",
      data: ComputerNew,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

const deleteComputer = async (req, res) => {
  const id = req.params.id;
  try {
    const ComputerLeft = await Computer.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "Computer deleted successfully",
      data: ComputerLeft,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!", error: err });
  }
};

module.exports = {
  addComputer,
  getComputers,
  getComputer,
  updateComputer,
  deleteComputer,
};
