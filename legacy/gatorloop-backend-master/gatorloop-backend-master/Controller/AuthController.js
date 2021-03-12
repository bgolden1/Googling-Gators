const userDAO = require("../DAO/UserDAO");
const User = require("../Model/User.js").Model;
const net = require("../Util/Net");
const error = require("../Util/Error");

const passport = require("passport");

const allowed_fields = ["name", "email", "subteam", "password"];
exports.allowed_fields = allowed_fields;

const required_fields = ["name", "email", "password", "subteam"];
exports.required_fields = required_fields;

exports.signup = (req, res) => {
    console.log("API POST request called for /auth/signup");

    //assume parameters sanitized on client
    const params = req.body;
    const keys = Object.keys(params);

    if (keys.length < required_fields.length) {
        res.status(422).json(net.getErrorResponse(error.INSUFFICIENT_FIELDS));
        return;
    }

    //name, username, password required
    for (let i = 0; i < required_fields.length; ++i) {
        if (!keys.includes(required_fields[i])) {
            res.status(422).json(net.getErrorResponse(error.MISSING_FIELD.name, `'${required_fields[i]}' field is required`));
            return;
        }
    }

    //check other fields allowed
    for (let i = 0; i < keys.length; ++i) {
        if (!allowed_fields.includes(keys[i])) {
            res.status(422).json(net.getErrorResponse(error.INVALID_FIELD.name, `cannot set field '${keys[i]}' or does not exist`));
            return;
        }
    }

    userDAO.createUser(params).then(function (newUser) {
        console.log("new user created", newUser);
        res.json(net.getSuccessResponse("new user created", newUser));
    }).catch(function(err) {
        if (err.name === "ValidationError") {
            console.error("Error Validating!", err);
            //todo: pass specific message of what field is not valid
            res.status(422).json(net.getErrorResponse(error.VALIDATION_ERROR));
        } else {
            console.error(err);
            res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
        }
    });
};

exports.login = (req, res, next) => {
    console.log("API POST request called for /auth/login");

    //todo: use passport-local-mongoose errors
    passport.authenticate('local', function(err, user, info) {
        console.log(user);
        if (err) {
            console.error(err);
            res.status(500).json(net.getErrorResponse("error", err));
            return;
        }
        if (!user) {
            res.status(403).json(net.getErrorResponse({name: "UserNotFound", message: "user not found"}));
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                console.error(err);
                res.status(500).json(net.getErrorResponse("error", err));
                return;
            }
            res.json(net.getSuccessResponse("successful login", user));
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    console.log("API GET request called for /auth/logout");

    //only one necessary?
    req.session.destroy();
    req.logout();
    res.json(net.getSuccessResponse("successful logout"));
};