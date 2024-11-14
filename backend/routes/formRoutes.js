const express = require("express");
const {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} = require("../controllers/formController");
const router = express.Router();

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;
