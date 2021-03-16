const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    owner: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    po_number: {
        type: Number,
        unique: true
    },
    description: {
        type: String
    },
    parts: [Object],
    status: {
        type: String,
        enum: ["New", "Seen", "Submitted", "Approved", "Ordered", "Delivered"],
        default: "New"
    },
    subteam: {
        type: String,
        enum: ["mech", "ece", "none", "unassigned"],
        default: "unassigned"
    },
    last_updated: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: String
    },
    priority: {
        type: Number,
        enum: [1,2,3,4,5]
    },
    comment: {
        type: String
    },
    total_price: {
        type: Number
    }
});

//multiple comments?
//priority and deadline?
//deadline string or date type?

exports.Model = mongoose.model("PurchaseOrder", Schema);
