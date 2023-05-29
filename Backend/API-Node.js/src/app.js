'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require("path");
const app = express();
const router = express.Router();

// app.use(express.static('views'));

// app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.set('views', path.join(__dirname, '..', 'views'));
// app.set('login', path.join(__dirname, 'pages/login'));

// Conecta ao banco de dados
mongoose.connect(config.connectionString);

// Carrega os Models
const Customer = require('./models/customer');

// Carrega as Rotas
const customerRoute = require('./routes/customer-route');

app.use(bodyParser.json({
    limit: '5mb'
    }
));
app.use(bodyParser.urlencoded({
    extended: false 
    }
));


// Habilita o CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use('/customers', customerRoute);

module.exports = app;