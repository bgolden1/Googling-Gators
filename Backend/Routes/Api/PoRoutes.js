const POController = require("../../Controllers/PoController.js");
const express = require("express");

let router = express.Router();

router.get("/po", POController.getAll);
router.get("/po:name", POController.getByName);
router.post("/po", (req, res) => {
    //validate input
    //create new po
    //save it and set response
});

module.exports = router;