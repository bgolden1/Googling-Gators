const express = require("express");

const partRoutes = require("./PartRoutes.js");

const router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "Welcome to the database api"});
});

module.exports = [partRoutes, router];