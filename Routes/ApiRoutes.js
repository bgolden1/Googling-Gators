const path = require("path");
const express = require("express");

const partRoutes = require(path.join(__dirname, "./Api/PartRoutes.js"));
const userRoutes = require(path.join(__dirname, "./Api/UserRoutes.js"));
const PoRoutes = require(path.join(__dirname, "./Api/PoRoutes.js"));

const router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "Welcome to the database api"});
});

module.exports = [partRoutes, userRoutes, PoRoutes, router];