const User = require("../DB_Models/User.js");

exports.getAllUsers = () => {
    return User.find({}).exec();
}

exports.getUserByEmail = (__email__) => {
    return User.findOne({email: __email__}).exec();
}

exports.getUserByID = (__id__) => {
    return User.findById(__id__).exec();
}

exports.getUserByRole = (__role__) => {
    return User.find({role: __role__}).exec();
}

exports.changeUserByID = (id, user) => {
    return User.findByIdAndUpdate(id, {$set: user}, { new: true , }).exec();
}

exports.removeUserByEmail = (__email__) => {
    return User.remove({email: __email__}).exec();
}

exports.createNewUser = (__subteam__, __role__, __name__, __ufid__, __email__, __password__) => {
    return this.getUserByEmail(__email__).then(user => {
        if (user) {
            user.subteam = __subteam__;
            user.role = __role__;
            user.name = __name__;
            user.ufid = __ufid__;
            user.email = __email__;
            user.password = __password__;
            return user.save();
        }
        else {
            const newUser = new User({
                subteam: __subteam__,
                role: __role__,
                name: __name__,
                ufid: __ufid__,
                email: __email__,
                password: __password__,
                
            })
            return newUser.save();
        }
    })
    .catch(err => {
        console.log(err);
    });
}