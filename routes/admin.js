const express = require('express')
const router = express.Router();
const User = require('../models/user')

// Rota para inserção de dados
router.post('/', (req, res, next) => {
    console.log('post admin')
    let newUser = new User({
        "login": req.body.login,
        "senha": req.body.senha,
        "tipo_acesso": req.body.tipo_acesso,
    })

    // Função addUser from user.js 
    User.addUser(newUser, (err, user) => {
        if (err) {
        	console.log(err)
            res.json({
                message: 'Usuário NÃO registrado',
                erro: err.toString()
            })
        } else {
            res.json({
                message: 'Usuário registrado com sucesso',
            })
        }
    });
})

// Rota para extração de dados
router.get('/', (req, res, next) => {
    console.log('get all admin')
    User.getUsers((err, user) => {
        console.log(user)
        if (err) {
            res.json({
                success: false,
                msg: 'failed to find user'
            })
        } else {
            res.json({
                user
            })
        }
    });
})



module.exports = router