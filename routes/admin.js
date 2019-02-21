// Instancia um objeto do MongoDB
const User = require('../models/user')

// Instancia do router para '/admin'
const express = require('express')
const router = express.Router();
router

// Rota para inserção de dados
    .post('/', (req, res, next) => {
    console.log('post /admin')
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
.get('/', (req, res, next) => {
    console.log('get all /admin')

    // Função listUsers from user.js 
    User.listUsers((err, user) => {
        console.log(user)
        if (err) {
            res.json({
                erro: err,
                message: 'Usuários não encontrados'
            })
        } else {
            res.json({
                user
            })
        }
    });
})

// Rota para remoção de dados
.delete('/', (req, res, next) => {
    console.log('delete /admin')

    // Função listUsers from user.js
    let login = req.body.login; 
    User.delUser(login, (err, user) => {
        console.log(user)
        if (err) {
            res.json({
                message: 'Usuário nao encontrado pra remoção'
            })
        } else {
            res.json({
                message: `Usuário ${login} removido`
                
            })
        }
    });
})



module.exports = router