const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../Config/config.json");
salt = config.auth.key;
const email = require("../../Config/Email");
const admin_email = require("../../Config/config.json").admin_email;

const userController = require("../../Controllers/UserController.js");
// Load input validation
const validateRegisterInput = require("../../Validation/Register.js");
const validateLoginInput = require("../../Validation/Login.js");
// Load User model
const User = require("../../DB_Models/User");

router.get("/users", userController.getAll);
router.get("/users:email", userController.getByEmail);
router.post("/user/remove:email", userController.removeUser);

// @route POST api/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          subteam: req.body.subteam,
          ufid: req.body.ufid,
          email: req.body.email,
          password: req.body.password
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
        email.sendEmail(admin_email, `New user verification for ${newUser.name}`, `<p>Hello Gatorloop Admin,</p>
        <p style="padding: 12px; font-style: italic;">Please verify that ${newUser.name} is a member of this club.</p>
        <p style="padding: 12px; font-style: italic;">Click <a href="https://gatorloop-ims.herokuapp.com/login" target="_blank" rel="noopener">here</a> to login and upgrade this user to "member" status.</p>
        <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px; font-style: italic;">Best,</p>
        <p style="padding-top: 12px; padding-right: 12px; padding-bottom: 12px; font-style: italic;">Gatorloop IMS</p>`)
      }
    });
  });

// @route POST api/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  // Form validation
const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
// Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          subteam: user.subteam,
          ufid: user.ufid,
          email: user.email,
          role: user.role
        };
// Sign token
        jwt.sign(
          payload,
          salt,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;