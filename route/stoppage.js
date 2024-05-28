const express = require("express");
const router = express.Router();
const { add, get, getById } = require("../controller/stoppageControl.js");
router.post("/add", add);
router.get("/all", get);
router.get("/find", getById);
module.exports = router;
