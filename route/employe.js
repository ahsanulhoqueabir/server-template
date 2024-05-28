const express = require("express");
const router = express.Router();
const {
  add,
  get,
  getById,
  modify,
  updatebyId,
} = require("../controller/employeController.js");
router.post("/add", add);
router.get("/all", get);
router.get("/find", getById);
router.put("/modify", modify);
router.put("/update/:id", updatebyId);

module.exports = router;
