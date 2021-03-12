const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../Config/config.json");
salt = config.auth.key;

// Load input validation
const validatePoInput = require("../../Validation/Orders.js");
// Load User model
const POrder = require("../../DB_Models/Orders");

// @route POST api/po
// @access Public
router.post("/orders", (req, res) => {
    // Form validation
  const { errors, isValid } = validatePoInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  POrder.findOne({ name: req.body.name }).then(po => {
      if (po) {
        return res.status(400).json({ name: "Purchase order already exists" });
      } else {
        const newPo = new POrder({
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
          url_link: req.body.url_link
        });
      }
    });
  });

  module.exports = router;