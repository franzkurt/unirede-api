const mongoose = require('mongoose')
const config = require('../config/db')

const UserSchema = mongoose.Schema({
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
    permissao: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

