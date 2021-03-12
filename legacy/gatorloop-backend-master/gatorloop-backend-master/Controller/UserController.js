const userDAO = require("../DAO/UserDAO");
const net = require("../Util/Net");
const error = require("../Util/Error");

const allowed_fields = ["name", "email", "subteam", "password"];
exports.allowed_fields = allowed_fields;

const required_fields = ["name", "email", "password", "subteam"];
exports.required_fields = required_fields;

//used for easy comparison in promote method
//greater number means greater access
const permission_levels = {
    admin: 10,
    manager: 5,
    member: 2,
    user: 1
};
exports.permission_levels = permission_levels;

exports.getAll = (req, res) => {
    console.log("API GET request called for all users");

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    if (req.user.role !== "admin") {
        res.status(401).json(net.getErrorResponse(error.USER_NOT_AUTHORIZED));
        return;
    }

    userDAO.getAllUsers().then(function (users) {
        res.json(net.getSuccessResponse(null, users));
    }).catch(function (err) {
        console.log("error getting all users: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.get = (req, res) => {
    console.log(`API GET request called for ${req.params.email}`);

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    if (req.params.email !== req.user.email && req.user.role !== "admin") {
        res.status(401).json(net.getErrorResponse(error.USER_NOT_AUTHORIZED));
        return;
    }
    userDAO.getUser(req.params.email).then(function (user) {
        if (user) {
            console.log(`Successfully retrieved ${req.params.email} from the database`);
            res.json(net.getSuccessResponse(null, user));
        } else {
            console.log(`Failed to retrieve ${req.params.email} from database; User does not exist`);
            res.status(404).json(net.getErrorResponse(error.NO_ENTRY_FOUND));
        }
    }).catch(function (err) {
        console.log("error getting user: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.create = (req, res) => {
    console.log(`API POST request called for "create user"`);

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    if (req.user.role !== "admin") {
        res.status(401).json(net.getErrorResponse(error.USER_NOT_AUTHORIZED));
        return;
    }

    //assume parameters have been sanitized on client side
    const params = req.body;
    const keys = Object.keys(params);

    if (keys.length < required_fields.length) {
        res.status(422).json(net.getErrorResponse(error.INSUFFICIENT_FIELDS));
        return;
    }

    //name, email, password required
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
        console.log("New User Created!", newUser);
        res.json(net.getSuccessResponse(null, newUser));
    }).catch(function (err) {
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

exports.update = (req, res) => {
    console.log(`API PUT request called for ${req.params.email}`);

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    if (req.params.email !== req.user.email && req.user.role !== "admin") {
        res.status(401).json(net.getErrorResponse(error.USER_NOT_AUTHORIZED));
        return;
    }

    //assume parameters have been sanitized on client side
    const params = req.body;
    const keys = Object.keys(params);

    if (keys.length === 0) {
        res.status(422).json(net.getErrorResponse(error.INSUFFICIENT_FIELDS));
        return;
    }

    for (let i = 0; i < keys.length; ++i) {
        if (!allowed_fields.includes(keys[i])) {
            res.status(422).json(net.getErrorResponse(error.INVALID_FIELD.name, `cannot update field '${keys[i]}' or does not exist`));
            return;
        }
    }

    userDAO.updateUser(req.params.email, params).then(function (updatedUser) {
        console.log("User " + updatedUser.email + " Updated!", updatedUser);
        //res.json(net.getSuccessResponse("updated", updatedUser));
        //todo fix this dumb workaround
        userDAO.getUser(updatedUser.email).then(function (updatedUserClean) {
            res.json(net.getSuccessResponse("updated", updatedUserClean));
        });
    }).catch(function (err) {
        console.error("failed to update record");
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

exports.delete = (req, res) => {
    console.log(`API DELETE request called for ${req.params.email}`);

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    if (req.params.email !== req.user.email && req.user.role !== "admin") {
        res.status(401).json(net.getResponse(true , error.USER_NOT_AUTHORIZED));
        return;
    }

    userDAO.deleteUser(req.params.email).then(function (result) {
        if (result.deletedCount === 0) {
            //fail
            //res.status(422).json(net.getErrorResponse("could not find record to remove for email: " + req.params.email));
            res.status(404).json(net.getErrorResponse(error.NO_ENTRY_FOUND));
        } else if (result.deletedCount === 1) {
            //success
            res.json(net.getSuccessResponse("successfully removed record", req.params.email));
        } else {
            //critical error
            res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
        }
    }).catch(function (err) {
        console.log("failed to remove record: ", err);
        res.status(500).json(net.getErrorResponse(error.INTERNAL_DATABASE_ERROR));
    });
};

exports.promote = (req, res) => {
    console.log(`API GET request called to promote ${req.params.email}`);

    if (!req.user || !req.isAuthenticated()) {
        res.status(401).json(net.getErrorResponse(error.NO_USER_SESSION));
        return;
    }

    //todo: only admin can demote

    if (permission_levels[req.params.role] > permission_levels[req.user.role]) {
        res.status(401).json(net.getErrorResponse(error.USER_NOT_AUTHORIZED));
        return;
    }

    userDAO.promoteUser(req.params.email, req.params.role).then(function (updatedUser) {
        console.log("User " + updatedUser.email + " Promoted!", updatedUser);
        res.json(net.getSuccessResponse("user promoted successfully"));
    }).catch(function (err) {
        console.log("failed to update record");
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
