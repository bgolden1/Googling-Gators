const PO = require("../DB_Models/Orders.js").Model;

exports.getAllPO = () => {
    return PO.find({}).exec();
}

exports.getPoByEmail = (__email__) => {
    return PO.find({owner_email: __email__}).exec();
}

exports.getPOByID = (__id__) => {
    return PO.findOne({_id: __id__}).exec();
}

exports.removePartByID = (__id__) => {
    return PO.remove({_id: __id__}).exec();
}