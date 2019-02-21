const mg = require('mongoose')
const config = require('../config/db')

const UserSchema = mg.Schema({
    login: {
        type: String,
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

module.exports.delUser = function(username, callback) {
    let user = {
        login: username
    }
    User.deleteOne(user, callback)
}