const Parts = require("../DB_Models/Parts.js").Model;

exports.getAllParts = () => {
    return Parts.find({}).exec();
}

exports.getPartByName = (__name__) => {
    return Parts.findOne({name: __name__}).exec();
}