const PO = require("../DB_Models/Orders.js").Model;

exports.getAllPO = () => {
    return PO.find({}).exec();
}

exports.getPoByName = (__name__) => {
    return PO.findOne({owner: __name__}).exec();
}