const PO = require("../DB_Models/Orders.js").Model;

exports.getAllPO = () => {
    return PO.find({}).exec();
}

exports.getPoByName = (__name__) => {
    return PO.find({owner: __name__}).exec();
}

exports.getPOByID = (__id__) => {
    return PO.findOne({_id: __id__}).exec();
}