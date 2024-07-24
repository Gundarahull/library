const mongoose = require("mongoose");

const SecretarySchema = new mongoose.Schema({
  secretaryName: { type: String, required: true },
  email: { type: String, required: true },
  logintime: [{ type: Date, required: true }],
  logouttime: { type: Date, required: false },
});

const Secretary = mongoose.model("Secretary", SecretarySchema);

module.exports = Secretary;
