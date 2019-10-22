var db       = require('../../config/dbCon');
var chalk    = require('chalk');
var alert    = require('alert-node');
var config   = require('../../config/config.js');

// REQUIRES DO TOKEN --------------------------------------------------------------------------------------
var passport = require('passport');
var crypto   = require('crypto');
var jwt      = require('jwt-simple');
var jsonjwt  = require('jsonwebtoken');

// VALIDAR OS CAMPOS --------------------------------------------------------------------------------------
module.exports.login = function(application, req, res){
    res.render('admin/login', {validacao: null, dadosLogin: {}, invalid: null});
}

// AUTENTICAR SE O USUÁRIO EXISTE --------------------------------------------------------------------------------------
module.exports.autenticar = function(application, req, res){
    var dadosLogin = req.body;
    req.assert('usuario','Preencha o nome de usuário.').notEmpty();
    req.assert('senha','Preencha uma senha válida.').notEmpty();

    var erros = req.validationErrors();

    if (erros){
        res.render('admin/login', {validacao: erros, dadosLogin: dadosLogin, invalid: null});
        console.log(chalk.red("Dados insuficientes para entrar"), dadosLogin);
        return;
    }

    var con = new db();
    var CadastroDAO = new application.app.models.CadastroDAO(con);
    CadastroDAO.autenticar(dadosLogin, function(access_token, dadosLogin){
        if (access_token == false){
            res.render('admin/login', {validacao: [{ location: 'body', msg: 'Usuário não encontrado.' }], dadosLogin: dadosLogin, invalid: null});
            console.log(chalk.red("O Token não foi ativado."));
            res.status(401);
            // res.json(null);
            res.end("");
        } else{
            console.log(chalk.green("O Token foi ativado"));
            res.status(201);
            res.json({access_token: access_token, user: dadosLogin.usuario});
        }
    });
}