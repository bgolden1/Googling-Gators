const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({});

const Schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "manager", "member", "user"]
    },
    subteam: {
        type: String,
        enum: ["mech", "ece", "none", "unassigned"],
        default: "unassigned"
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    email_confirmed: {
        type: Boolean,
        default: false
    }
});

//todo: implement array of po_numbers owned

UserSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
    selectFields: [
         "_id",
        "role",
        "subteam",
        "email_confirmed",
        "email",
        "name",
        "date_created"
    ]
});

UserSchema.add(Schema);

exports.Model = mongoose.model("User", UserSchema);
