const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const database = require(path.join(__dirname,  "./Database/Database.js"));
const apiRoutes = require(path.join(__dirname,  "./Routes/ApiRoutes.js"));
var cors = require('cors')

//main express app
let app = express();
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Now listening on port ${process.env.PORT}`);
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

app.use(express.static(path.join(__dirname, 'build')));

app.use(passport.initialize());

// Passport config
require(path.join(__dirname,  "./Config/Passport.js"))(passport);

app.use("/api", apiRoutes);

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})