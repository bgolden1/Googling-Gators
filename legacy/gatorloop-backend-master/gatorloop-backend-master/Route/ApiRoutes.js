const express = require("express");

const userRoutes = require("./UserRoutes");
const purchaseOrderRoutes = require("./PurchaseOrderRoutes");
const net = require("../Util/Net");

const router = express.Router();

router.get("/", function(req, res) {
    res.json({message: "Welcome to the database api"});
});

//default for /api/*
router.get("*", function (req, res) {
    res.status(404).json(net.getErrorResponse("api endpoint not found"));
});

module.exports = [userRoutes, purchaseOrderRoutes, router];