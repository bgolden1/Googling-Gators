const Parts = require("../DB_Models/Parts.js").Model;

exports.getAllParts = () => {
    return Parts.find({}).exec();
}