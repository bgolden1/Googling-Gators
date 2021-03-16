const mongoose = require("mongoose");

const config = require("../Config/config.json");

const url = config.development.database.url;

// Events
mongoose.connection.on("connected", function() {
    console.log("Mongoose default connection open to " + url);
});

mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection disconnected");
});

//Settings
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose default connection disconnected through app termination");
        process.exit(0);
    });
});

exports.connect = () => {
    mongoose.connect(url);
};

exports.connection = mongoose.connection;
