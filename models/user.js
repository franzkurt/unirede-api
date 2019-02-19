const mg = require('mongoose')
const config = require('../config/db')

const UserSchema = mg.Schema({
	name:{
		type: String
	},
	email:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
});

const User = module.exports = mg.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
module.exports.addUser = function(User, callback){
	User.save(callback)
}