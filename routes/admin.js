const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.post('/', (req, res, next)=>{
	console.log(req.body)
	let newUser = new User ({
		"name": req.body.name,
		"email": req.body.email,
		"username": req.body.username,
		"password": req.body.password
	})
	User.addUser(newUser, (err, user)=>{
		if(err){
			res.json({success:false,msg:'failed to reg user'})
		}else{
			res.json({success:true,msg:'user registered'})
		}
	});
})



module.exports = router