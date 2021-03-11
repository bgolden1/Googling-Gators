const POController = require("../../Controllers/PoController.js");
const express = require("express");

let router = express.Router();

router.get("/po", POController.getAll);
router.get("/po:name", POController.getByName);

module.exports = router;