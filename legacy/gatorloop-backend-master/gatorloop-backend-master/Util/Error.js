//request validation
exports.INVALID_FIELD = {
    name: "InvalidField",
    message: "Field is not in set of allowed fields."
};
exports.INVALID_VALUE_TYPE = {
    name: "InvalidValueType",
    message: "Value is not the correct type (string, number, etc)."
};
exports.INVALID_PARTS_OBJECT = {
    name: "InvalidPartsObject",
    message: "Parts object is not valid."
};
exports.INSUFFICIENT_FIELDS = {
    name: "InsufficientFields",
    message: "Request does not have sufficient number of parameters."
};
exports.MISSING_FIELD = {
    name: "MissingField",
    message: "A required parameter was not sent in the request."
};

//database
exports.DUPLICATE_VALUE = {
    name: "DuplicateValue",
    message: "Value already exists in the database."
};
exports.INTERNAL_DATABASE_ERROR = {
    name: "InternalDatabaseError",
    message: "Error occurred out of control of requester. Contact DB admin."
};
exports.VALIDATION_ERROR = {
    name: "ValidationError",
    message: "Data does not meet database validation criteria."
};
exports.NO_ENTRY_FOUND = {
    name: "NoEntryFound",
    message: "No entry found for specified identifier."
};

//permissions
exports.NO_USER_SESSION = {
    name: "NoUserSession",
    message: "No user is logged in."
};
exports.USER_NOT_AUTHORIZED = {
    name: "UserNotAuthorized",
    message: "User does not have permission to make that request."
};
