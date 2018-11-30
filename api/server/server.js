const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const multiParty = require('connect-multiparty');


const app = express();

app.use(expressValidator());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiParty());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers","content-type");
    res.setHeader("Access-Control-Allow-Credentials",true);

    next();
});

consign()
	.include('app/routes')
	.then('app/model')
	.then('app/controllers')
	.then('server/dbConnection.js')
	.into(app);

module.exports = app;


