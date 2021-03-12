const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create Schema
const PoSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    url_link: {
        type: String
    }
});

module.exports = POrder = mongoose.model("orders", PoSchema, "orders");