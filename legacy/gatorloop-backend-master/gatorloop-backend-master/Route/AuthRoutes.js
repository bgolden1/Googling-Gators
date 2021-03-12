const express = require("express");
const passport = require("passport");
const net = require("../Util/Net");

const authController = require("../Controller/AuthController");

let router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

//check if user is logged in
//is this needed 
router.get("/status", function (req, res) {
    if (req.isAuthenticated()) {
        res.json({status: "success", data: {email: req.user.email, role: req.user.role, subteam: req.user.subteam}});
    } else {
        res.json({status: "fail", error: "no current user logged in"});
    }
});

//default for /auth/*
router.get("*", function (req, res) {
    res.json(net.getErrorResponse("invalid auth route"));
});

module.exports = router;