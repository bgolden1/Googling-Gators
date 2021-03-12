const PurchaseOrder = require("../Model/PurchaseOrder.js").Model;

exports.getAllPurchaseOrders = () => {
    return PurchaseOrder.find({}).exec();
};

exports.createPurchaseOrder = (data) => {
    const keys = Object.keys(data);
    const newPO = new PurchaseOrder({});

    for (let i = 0; i < keys.length; ++i) {
        console.log(newPO[keys[i]] + " => " + data[keys[i]]);
        newPO[keys[i]] = data[keys[i]];
    }

    return newPO.save();
};

//get po by number
exports.getPO = (po_number_) => {
    return PurchaseOrder.findOne({ po_number: po_number_ });
};

exports.updatePO = (po_number_, new_info) => {

    const keys = Object.keys(new_info);
    console.log(keys);

    return new Promise (function (resolve, reject) {
        PurchaseOrder.findOne({ po_number: po_number_ }).exec().then(function (po) {
            for (let i = 0; i < keys.length; ++i) {
                console.log(po[keys[i]] + " => " + new_info[keys[i]]);
                po[keys[i]] = new_info[keys[i]];
            }
            resolve(po.save());
        }).catch(function (err){
            reject(err);
        });
    });
};

exports.deletePO = (po_number_) => {
    return PurchaseOrder.remove({po_number: po_number_}, {single: true}).exec();
};

exports.getBySubteam = (subteam_) => {
    return PurchaseOrder.find({subteam: subteam_}).exec();
};

exports.getByUser = (email_) => {
    return PurchaseOrder.find({owner: email_}).exec();
};
