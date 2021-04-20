const path = require("path");
const POController = require(path.join(__dirname,  "../../Controllers/PoController.js"));
const express = require("express");
// Load input validation
const validatePoInput = require(path.join(__dirname,  "../../Validation/Orders.js"));
// Load User model
const POrder = require(path.join(__dirname,  "../../DB_Models/Orders")).Model;
const Parts = require(path.join(__dirname,  "../../Actions/PartsActions"));
const email = require(path.join(__dirname,  "../../Config/Email"));
const admin_email = process.env.ADMIN_EMAIL;
const User = require(path.join(__dirname,  "../../DB_Models/User.js"));

let router = express.Router();

router.get("/po", POController.getAll);
router.get("/po/owner:email", POController.getByEmail);
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
        owner_email: req.body.owner_email,
        subteam: req.body.subteam
    });
    //save it and set response
    newPo
        .save()
        .then(po => res.json(po))
        .catch(err => console.log(err));
    email.sendEmail(admin_email, `New PO created for ${newPo.subteam}`, `<p>Hello Gatorloop Admin,</p>
    <p style="padding: 12px; ">Please approve and/or submit this PO.</p>
    <p style="padding: 12px; font-style: italic;">Click&nbsp;<a href="https://gatorloop-ims.herokuapp.com/order" target="_blank" rel="noopener">here</a>&nbsp;to login and see this PO.</p>
    <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px;">Best,</p>
    <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px;">Gatorloop IMS</p>
    <p>&nbsp;</p>`)
    
});
router.post("/upgradeStatus", (req, res) => {
    POrder.findOne({_id: req.body.id}).exec().then(PO => {
        const options = ["new", "approved", "submitted", "received"];
        if (PO.status == "submitted") {
            for (var i = 0; i < PO.parts.length; i++) {
                Parts.createNewPart(PO.parts[i].name, PO.parts[i].description, PO.parts[i].quantity);
            }
        }
        for (var i = 0; i < options.length - 1; i++) {
            if (PO.status == options[i]) {
                PO.status = options[i + 1];
                break;
            }
        }
        PO
            .save()
            .then(po => res.json(po))
            .catch(err => console.log(err));
        
        email.sendEmail(PO.owner_email, `Status of PO has changed`, `<p>Hello ${PO.owner},</p>
        <p style="padding: 12px; ">This PO has been changed to ${PO.status}</p>
        <p style="padding: 12px; font-style: italic;">Click&nbsp;<a href="https://gatorloop-ims.herokuapp.com/order" target="_blank" rel="noopener">here</a> to login and see this PO.</p>
        <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px; ">Best,</p>
        <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px; ">Gatorloop IMS</p>
        <p>&nbsp;</p>`)
    });
})
router.post("/po/remove:id", POController.removeByID);

module.exports = router;