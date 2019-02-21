const mg = require('mongoose')
const config = require('../config/db')

const UserSchema = mg.Schema({
    login: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    tipo_acesso: {
        type: String,
        required: true
    },
    created: {
        type: Date
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

const User = module.exports = mg.model('User', UserSchema);

module.exports.listUsers = function(callback) {
    User.find({}, callback)
}
module.exports.addUser = function(newUser, callback) {
    newUser.created = new Date()
    newUser.save(callback)
}

module.exports.delUser = function(login, callback) {
    let user = {
        login: login
    }
    User.deleteOne(user, callback)
}

module.exports.updateUser = function(login1, callback) {
    User.findOneAndUpdate({
        login: "aloha"
    }, {
        $set: {
            name: "Naomi"
        }
    }, {
        new: true
    }, callback);
}