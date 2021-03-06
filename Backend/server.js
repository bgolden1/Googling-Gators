const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const config = require("./Config/config.json");
const database = require("./Database/Database.js");

//main express app
let app = express();

app.listen(config.port, "localhost", () => {
    console.log(`Now listening on port ${config.port}`);
});

database.connect();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: "ntk7",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    store: new MongoStore({
        mongooseConnection: database.connection,
        ttl: 60 * 60, // 1 hour til expiration
        touchAfter: 24 * 3600 // time period in seconds to update even if unchanged
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
    res.json({message: "Welcome to the Gatorloop IMS backend."});
});