// Instancia um objeto do MongoDB
const User = require('../models/user')

// Instancia do router para '/admin'
const express = require('express')
const router = express.Router();

// Rota para inserção de dados
router.post('/', (req, res, next) => {
    console.log('post /admin')
    newUser = new User({
        "login": req.body.login,
        "senha": req.body.senha,
        "permissao": req.body.permissao,
        "created": new Date()
    })
    newUser.save()
        .then((listUsers) => {
            res.json(listUsers);
        })
        .catch((err) => {
            res.json();
        })
})

// Rota para extração de dados
.get('/:id', (req, res, next) => {
    User.find({login:req.params.id})
        .then((listUsers) => {
            res.json(listUsers);
        })
        .catch((err) => {
            console.log(err);
        })
})

.get('/', (req, res, next) => {
    User.find()
        .then((listUsers) => {
            res.json(listUsers);
        })
        .catch((err) => {
            console.log(err);
        })
})

// Rota para remoção de dados
.delete('/', (req, res, next) => {
    let login = req.body.login;
    User.deleteOne(login)
        .then(user => {
            res.json({
                message: 'Dados alterados com sucesso'
            });
        })
        .catch(err => {
            res.json({
                message: 'Usuário nao encontrado'
            })
        })
})

// Rota para update de dados
.put('/', (req, res, next) => {
    let oldLogin, newLogin
    
    if (req.body.hasOwnProperty('old_login') && req.body.old_login !== ""){
        oldLogin = req.body.old_login;
    }
    if (req.body.hasOwnProperty('new_login') && req.body.new_login !== ""){
        newLogin = req.body.new_login;
    }

    updateUser = function(oldLogin, newLogin) {
        return User.findOneAndUpdate({
            login: oldLogin
        }, {
            $set: {
                login: newLogin
            }
        }, {
            // retorna o novo valor do banco
            new: true,
            // valida os dados do objeto novamente
            runValidators: true
        });
    }

    updateUser(oldLogin, newLogin)
        .then(user => {
            res.json({
                message: 'Dados alterados com sucesso'
            });
        })
        .catch(err => {
            res.json({
                message: 'Usuário nao encontrado'
            })
        });
});


module.exports = router;