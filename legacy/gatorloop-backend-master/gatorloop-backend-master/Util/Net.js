// exports.getResponse = (fail, msg, data = "") => {
//     if (fail) {
//         return {success: !fail, error: msg};
//     } else {
//         return {success: fail, message: msg, data: data};
//     }
// };

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

// not functional??
// exports.cleanUserData = (userData) => {
//     delete userData.salt;
//     delete userData.hash;
//     return userData;
// };
