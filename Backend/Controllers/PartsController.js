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

exports.changePartByID = (req, res) => {
    var part = {
        name: req.body.name,
        description: req.body.description,
        quantity_available: req.body.quantity_available,
        total_quantity: req.body.total_quantity,
        last_checked_out: req.body.last_checked_out
    };
    parts.changePartByID(req.body._id, part).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.body._id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.checkoutPartByID = (req, res) => {
    const old_part = parts.getPartByID(req.body._id).then(function(result){
        var num_to_checkout = req.body.num_to_checkout;
        if (num_to_checkout > result.quantity_available) {
            res.status(500).json({"message": "requested too many"})
        }
        else {
            var part = {
                name: result.name,
                description: result.description,
                quantity_available: result.quantity_available - num_to_checkout,
                total_quantity: result.total_quantity,
                last_checked_out: Date.now()
            };
            parts.changePartByID(req.body._id, part).then(function (pos) {
                res.json(net.getSuccessResponse(null, pos));
            }).catch(function (err) {
                console.log("error getting part ", req.body._id, ": ", err);
                res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
            })
        }
    }).catch(function (err) {
        console.log("error getting part ", req.body._id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
}


exports.checkInPartByID = (req, res) => {
    const old_part = parts.getPartByID(req.body._id).then(function(result){
        var num_to_checkin = Number(req.body.num_to_checkin);
        if (num_to_checkin + Number(result.quantity_available) > result.total_quantity) {
            res.status(500).json({"message": "requested too many"})
        }
        else {
            var part = {
                name: result.name,
                description: result.description,
                quantity_available: result.quantity_available + num_to_checkin,
                total_quantity: result.total_quantity,
                last_checked_out: result.last_checked_out
            };
            parts.changePartByID(req.body._id, part).then(function (pos) {
                res.json(net.getSuccessResponse(null, pos));
            }).catch(function (err) {
                console.log("error getting part ", req.body._id, ": ", err);
                res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
            })
        }
    }).catch(function (err) {
        console.log("error getting part ", req.body._id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
}

exports.removePart = (req, res) => {
    parts.removePartByName(req.params.name).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting part ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}