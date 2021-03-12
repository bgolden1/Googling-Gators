const mongoose = require("mongoose");

//counter
const Model = mongoose.model("Counter", {name: String, sequence_value: Number});
exports.Model = Model;

//adapted from https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm
exports.getNextSequenceValue = (sequenceName) => {
    return Model.findOneAndUpdate(
        {name: sequenceName },
        {$inc:{sequence_value:1}},
        {new: true, useFindAndModify: true}
    ).exec();
};

//todo: initialize counter if doesn't exist
//or setup script or something?
//check for counter
// if (!CounterModel.exists({name: "po_counter"})) {
//     console.log("create po_counter");
//     CounterModel.create({name: "po_counter", sequence_value: 1});
// }
