const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    Total_price: {
        type: Number
    },
    URL_link: {
        type: String
       
    }
});

exports.Model = mongoose.model("po", Schema);