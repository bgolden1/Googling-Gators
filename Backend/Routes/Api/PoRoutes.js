const POController = require("../../Controllers/PoController.js");
const express = require("express");
// Load input validation
const validatePoInput = require("../../Validation/Orders.js");
// Load User model
const POrder = require("../../DB_Models/Orders").Model;

let router = express.Router();

router.get("/po", POController.getAll);
router.get("/po/owner:name", POController.getByName);
router.get("/po:id", POController.getByID);
router.post("/po", (req, res) => {
    //validate input
    const { errors, isValid } = validatePoInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
      }
    //create new po
    var cost = 0;
    for(var i = 0; i < req.body.parts.length; i++) {
        var part = req.body.parts[i];
        cost += part.quantity * part.cost_per;
    }
    const newPo = new POrder({
        company: req.body.company,
        parts: req.body.parts,
        purpose: req.body.purpose,
        total_cost: cost,
        owner: req.body.owner,
        subteam: req.body.subteam
    });
    //save it and set response
    newPo
        .save()
        .then(po => res.json(po))
        .catch(err => console.log(err));
});

module.exports = router;