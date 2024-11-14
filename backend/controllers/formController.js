const Form = require("../models/form.model");

exports.createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getForms = async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
};

exports.getFormById = async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
};

exports.updateForm = async (req, res) => {
  const form = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(form);
};

exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).send("Form not found");
    }
    res.status(200).send("Form deleted successfully");
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
