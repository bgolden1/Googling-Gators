const parts = require("../Actions/PartsActions.js");
const net = require("../Utils/Net");

exports.getAll = (req, res) => {
    parts.getAllParts().then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting all purchase orders: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};