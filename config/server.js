var express           = require('express');
var consign           = require('consign');
var bodyParser        = require('body-parser');
var expressValidator  = require('express-validator');
var passport          = require('passport');
var JwtBearerStrategy = require('passport-http-bearer');
var jwebt             = require('jsonwebtoken');
var chalk             = require('chalk');
var config            = require('./config.js');

// VIEWS E ENGINE VIEW
var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// PEGAR ARQUIVOS DA PASTA PUBLIC
app.use('/static', express.static(__dirname + '\\..\\app\\public'));
app.use('/routes', express.static(__dirname + '\\..\\app\\routes'));

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

consign()
    .include('app/routes')
    .then('config/dbCon.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

// SISTEMA DE TOKEN
console.log(chalk.yellow('|─| Carregando JwtBearerStrategy |─|'));
passport.use(new JwtBearerStrategy(config.secretApiKey, function(token, done) {
    if(token != "null"){
        jwebt.verify(token, config.secretApiKey, function(err, decoded) {
            if (err) {
                return done(null, false);
            } 
            else {
                var usuario = jwebt.decode(token, config.secretApiKey);
                return done(null, usuario, { scope: 'all' });
            }
          });
    } else{
        console.log(chalk.red('Token Vazio.'));
        return done(null, false);
    }
}));

module.exports = app;