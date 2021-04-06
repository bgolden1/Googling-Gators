const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subteam: {
    type: String,
    enum: ["Business", "ECE", "Mech", "unassigned"],
    default: "unassigned"
  },
  ufid: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user", //instantialize as default user
    enum: ["user", "admin", "member"]
  }
});
module.exports = User = mongoose.model("users", UserSchema);