require('dotenv').config({path: './.env'})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(function (req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Create routes;
app.use(require('./routes/web'));

app.listen(3000, function () {
    console.log('running');
});

