const express = require("express");

const partRoutes = require("./Api/PartRoutes.js");
const userRoutes = require("./Api/UserRoutes.js");

const router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "Welcome to the database api"});
});

module.exports = [partRoutes, userRoutes, router];