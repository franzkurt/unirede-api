const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/db.js')

mongoose.connect(config.database)
mongoose.connection.on('connected',()=>{
	console.log('connected to db '+config.database)
})
const port = 7654;

app.listen(port, () => {
	console.log('server starts at port: '+port)
})

// Proteção para CORS
app.use(cors());

app.use(bodyParser.json());

// Roteamento principal
app.get('/', function(req, resp){
	resp.send('<p>some html</p><a href="admin">dashboard</a>')
})

const admin = require('./routes/admin')
app.use('/admin', admin)

// "C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
// show dbs
// use meanauth
// db.users.find().pretty()