const path = require("path");
const PO = require(path.join(__dirname,  "../Actions/PoActions.js"));
const net = require(path.join(__dirname,  "../Utils/Net"));

exports.getAll = (req, res) => {
    PO.getAllPO().then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting all parts: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.getByEmail = (req, res) => {
    PO.getPoByEmail(req.params.email).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.getByID = (req, res) => {
    PO.getPOByID(req.params.id).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.params.id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.removeByID = (req, res) => {
    PO.removePartByID(req.params.id).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.params.id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}