const parts = require("../Actions/PartsActions.js");
const net = require("../Utils/Net");

exports.getAll = (req, res) => {
    parts.getAllParts().then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting all parts: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.getByName = (req, res) => {
    parts.getPartByName(req.params.name).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}