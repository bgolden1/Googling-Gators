const path = require("path");
const users = require(path.join(__dirname,  "../Actions/UserActions.js"));
const net = require(path.join(__dirname,  "../Utils/Net"));

exports.getAll = (req, res) => {
    users.getAllUsers().then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting all users: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.getByEmail = (req, res) => {
    users.getUserByEmail(req.params.email).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting user ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.changeUserByID = (req, res) => {
    var user = {
        subteam: req.body.subteam,
        role: req.body.role,
        name: req.body.name,
        ufid: req.body.ufid,
        email: req.body.email,
        password: req.body.password
    };
    user.changeByID(req.body._id, user).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting user ", req.body._id, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.removeUser = (req, res) => {
    users.removeUserByEmail(req.params.email).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting user ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}

exports.createNewUser = (req, res) => {
    users.createNewUser(
        req.body.subteam,
        req.body.role,
        req.body.name,
        req.body.ufid,
        req.body.email,
        req.body.password
    ).then(function (pos) {
        res.json(net.getSuccessResponse(null, pos));
    }).catch(function (err) {
        console.log("error getting user ", req.params.name, ": ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    })
}