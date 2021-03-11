const PO = require("../DB_Models/Po.js").Model;

exports.getAllPO = () => {
    return PO.find({}).exec();
}

exports.getPoByName = (__name__) => {
    return PO.findOne({name: __name__}).exec();
}