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
    subteam: {
        type: String
    }
});

exports.Model = mongoose.model("orders", PoSchema, "orders");