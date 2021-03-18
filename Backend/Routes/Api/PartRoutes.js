const partsController = require("../../Controllers/PartsController.js");
const express = require("express");

let router = express.Router();

router.get("/parts", partsController.getAll);
router.get("/parts:name", partsController.getByName);
router.post("/edit/parts", partsController.changePartByID);

module.exports = router;