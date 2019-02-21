const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/db.js');

// Configura a conexão do BD MongoDB
mongoose.connect(config.database);

// Conecta
mongoose.connection.on('connected', () => {
    console.log('connected to db ' + config.database)
});

// Porta de Acesso TCP no localhost
const port = 7654;

// Instancia do express
const app = express();

// Ativa modo "listening" habilitando a conexão do Back-End
app.listen(port, () => {
    console.log('Servidor rodando na porta: ' + port)
})

// Proteção para CORS (Scripts Maliciosos)
app.use(cors());

// Habilita parser do "body" na "request"
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