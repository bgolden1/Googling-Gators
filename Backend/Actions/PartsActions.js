const Parts = require("../DB_Models/Parts.js").Model;

exports.getAllParts = () => {
    return Parts.find({}).exec();
}

exports.getPartByName = (__name__) => {
    return Parts.findOne({name: __name__}).exec();
}

exports.getPartByID = (__id__) => {
    return Parts.findById(__id__).exec();
}

exports.changePartByID = (id, part) => {
    return Parts.findByIdAndUpdate(id, {$set: part}, { new: true , }).exec();
}

exports.removePartByName = (__name__) => {
    return Parts.remove({name: __name__}).exec();
}

exports.createNewPart = (__name__, __description__, __quantity__) => {
    return this.getPartByName(__name__).then(part => {
        if (part) {
            part.total_quantity += Number(__quantity__);
            part.quantity_available += Number(__quantity__);
            return part.save();
        }
        else {
            const newPart = new Parts({
                name: __name__,
                description: __description__,
                quantity_available: __quantity__,
                total_quantity: __quantity__
            })
            return newPart.save();
        }
    })
    .catch(err => {
        console.log(err);
    });
}