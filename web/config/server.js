const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const consign = require('consign');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const multiparty = require('connect-multiparty');
app.set('view engine','ejs');
app.set('views','./app/views');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('./app/public'));
app.use(expressValidator());
app.use(multiparty());
app.use(expressSession({
    secret:'mcflyviajounotempocomrick',
    resave:false,
    saveUninitialized:false       
}));

consign().include('app/routes').then('app/controllers').then('app/model').into(app);

module.exports = app;