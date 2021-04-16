const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    quantity_available: {
        type: Number
    },
    total_quantity: {
        type: Number
    },
    last_checked_out: {
        type: Date,
        default: Date.now
    },
    checked_out_by: [{
        name: {
            type: String
        },
        time: {
            type: Date,
            default: Date.now
        }
    }]
});

exports.Model = mongoose.model("parts", Schema);