const express = require("express");

const router = express.Router();
const busRoute = require("../controller/busRoute");

router.post("/add", busRoute.add);
router.get("/all", busRoute.get);
router.get("/:id", busRoute.getById);
router.put("/:id", busRoute.update);
router.delete("/:id", busRoute.remove);

module.exports = router;
