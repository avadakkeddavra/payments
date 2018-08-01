require('dotenv').config({path: './.env'})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('express-mailer');
const Yandex = require('yandex-checkout')(process.env.YANDEX_SHOP_ID, process.env.YANDEX_SECRET_KEY);

app.set('views', './views');
app.set('view engine', 'pug');

 
 
mailer.extend(app, {
  from: process.env.MAIL_USER,
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});


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

