let axios = require('axios');

let authed;

let name;
let email;
let role;
let subteam;

  // let getName = function() {
  //   return name;    // Or pull this from cookie/localStorage
  // };
  //
  // let setName = function(name) {
  //   this.name = name;
  //   // Also set this in cookie/localStorage
  // };
  //
  // let getEmail = function() {
  //   return email;    // Or pull this from cookie/localStorage
  // };
  //
  // let setEmail = function(email) {
  //   this.email = email;
  //   // Also set this in cookie/localStorage
  // };
  //
  // let getRole = function() {
  //   return role;    // Or pull this from cookie/localStorage
  // };
  //
  // let setRole = function(role) {
  //   this.role = role;
  //   // Also set this in cookie/localStorage
  // };
  //
  // let getSubteam = function() {
  //   return subteam;    // Or pull this from cookie/localStorage
  // };
  //
  // let setSubteam = function(subteam) {
  //   this.subteam = subteam;
  //   // Also set this in cookie/localStorage
  // };

exports.getUser = function() {
    return {name: name, email: email, role: role, subteam: subteam}
  };

exports.setUser = function(user) {
    authed = true;
    name = user.name;
    email = user.email;
    role = user.role;
    subteam = user.subteam;
    setInterval(() => {
      checkAuth();
    }, 10000)
  };

exports.removeUser = function() {
    authed = false;
    name = null;
    email = null;
    role = null;
    subteam = null;
  };

let checkAuth = function() {
  axios.get('/auth/status').then(function(response) {
    if (response.data.status !== "success") exports.removeUser();
  });
};

exports.isAuthed = function() {
  //checkAuth();
  return authed;
};
