const mongoose = require('mongoose');
const config = require('./config/db.js');

// Configura a conexão do BD MongoDB
mongoose.connect(config.database)
    .then(() => {
            console.log("connected")
        },
        err => {
            console.log("deu ruim", err);
        }
    );

// Porta de Acesso TCP no localhost
const port = 7654;

// Instancia do express
const express = require('express');
const app = express();

// Ativa modo "listening" habilitando a conexão do Back-End
app.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port)
})

// Proteção para CORS (Scripts Maliciosos)
const cors = require('cors');
app.use(cors());

const helmet = require('helmet');
app.use(helmet());

// Habilita parser do "body" na "request"
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Rota principal
app.get('/', function(req, resp) {
    resp.send('<p>some html</p><a href="admin">dashboard</a>')
})

const admin = require('./routes/admin')
app.use('/admin', admin)

// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
// show dbs
// use meanauth
// db.users.find().pretty(²)