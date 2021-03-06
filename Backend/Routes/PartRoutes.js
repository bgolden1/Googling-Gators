const partsController = require("../Controllers/PartsController.js");
const express = require("express");

let router = express.Router();

router.get("/parts", partsController.getAll)

module.exports = router;