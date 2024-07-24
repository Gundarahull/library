const mongoose = require("mongoose");


//here we cam add more details like Ram, Graphhic Id ad its generation........
const ComputerSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  available: { type: Boolean, default: true },
});

const Computer = mongoose.model("Computer", ComputerSchema);

module.exports = Computer;
