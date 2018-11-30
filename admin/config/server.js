const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const formData = require('form-data');

app.set('view engine','ejs');
app.set('views','./app/views');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(expressSession({
   secret:'piropoxidsnkl',
    resave:false,
    saveUninitialized:false
}));

consign().include('app/routes').then('app/controllers').into(app);

module.exports = app;