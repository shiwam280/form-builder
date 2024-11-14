const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  type: String,
  title: String,
  placeholder: String,
});

const formSchema = new mongoose.Schema({
  title: String,
  inputs: [inputSchema],
});

module.exports = mongoose.model("Form", formSchema);
