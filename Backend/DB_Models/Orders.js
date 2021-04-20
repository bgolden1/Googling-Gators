const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const PoSchema = new Schema({
    company: {
        name: {
            type: String
        },
        url: {
            type: String
        }
    },
    parts: [{
        name: {
            type: String
        },
        description: {
            type: String
        },
        url: {
            type: String
        },
        quantity: {
            type: Number
        },
        cost_per: {
            type: Number
        }
    }],
    purpose: {
        type: String
    },
    total_cost: {
        type: Number
    },
    owner: {
        type: String
    },
    owner_email: {
        type: String
    },
    subteam: {
        type: String
    },
    status: {
        type: String,
        enum: ["new", "approved", "submitted", "received"],
        default: "new"
    }
});

exports.Model = mongoose.model("orders", PoSchema, "orders");