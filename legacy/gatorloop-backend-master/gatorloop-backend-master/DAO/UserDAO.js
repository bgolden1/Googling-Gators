const User = require("../Model/User.js").Model;

exports.createUser = (data) => {
    const password = data.password;
    delete data.password;

    const newUser = new User(data);
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; ++i) {
        console.log(newUser[keys[i]] + " => " + data[keys[i]]);
    }

    return User.register(newUser, password);
};

exports.getAllUsers = () => {
    return User.find({}).exec();
};

//get user by email
exports.getUser = (email_) => {
    return User.findOne({ email: email_ });
};

exports.updateUser = (email_, new_info) => {

    const password = new_info.password;
    delete new_info.password;

    const keys = Object.keys(new_info);
    console.log(keys);

    return new Promise (function (resolve, reject) {
        User.findOne({ email: email_ }).exec().then(function (user) {
            for (let i = 0; i < keys.length; ++i) {
                console.log(user[keys[i]] + " => " + new_info[keys[i]]);
                user[keys[i]] = new_info[keys[i]];
            }
            user.setPassword(password).then((result) => {
                resolve(user.save());
            });
        }).catch(function (err){
            reject(err);
        });
    });
};

exports.deleteUser = (email_) => {
    return User.remove({email: email_}, {single: true}).exec();
};

exports.promoteUser = (email_, new_role) => {
    return new Promise (function (resolve, reject) {
        User.findOne({ email: email_ }).exec().then(function (user) {
            user.role = new_role;
            resolve(user.save());
        }).catch(function (err){
            reject(err);
        });
    });
};
