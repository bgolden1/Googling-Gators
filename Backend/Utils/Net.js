exports.getErrorResponse = (name, message) => {
    return {success: false, error: {name: name, message: message}};
};

exports.getErrorResponse = (error) => {
    return {success: false, error: {name: error.name, message: error.message}};
};

exports.getSuccessResponse = (message, data) => {
    if (!message) message = "";
    if (typeof data === "undefined") data = {};
    return {success: true, message: message, data: data}
};