var crypto = require("crypto");
var jwt = require('jwt-simple');
var jwebt = require('jsonwebtoken');
var chalk = require('chalk');
var config = require('../../config/config.js');

function CadastroDAO(conCad){
    this._conCad = conCad;
}

// CADASTRAR O USUÁRIO ---------------------------------------------------------------------------------------
CadastroDAO.prototype.cadastrarUsuario = function(users, callback){
    var senhacrypto = crypto.createHash('MD5').update(users.senha).digest("hex");
    users.senha = senhacrypto

    this._conCad.query('insert into users set ?', users, callback);
}

// AUTENTICAR O USUÁRIO --------------------------------------------------------------------------------------
CadastroDAO.prototype.autenticar = function(dadosLogin, callback){
    var senhacrypto = crypto.createHash('MD5').update(dadosLogin.senha).digest("hex");

    this._conCad.connect();
    var sql = ("Select * from users where usuario = '" + dadosLogin.usuario + "' and senha = '" + senhacrypto + "' ");
    this._conCad.query(sql, function(err, rows, fields){

        if(err) throw err;
        
        if (rows[0] == undefined){
            console.log(chalk.red('Usuário não encontrado.'));
            callback(false, dadosLogin);
        } else{
            console.log(chalk.green('Acesso autorizado.'));

            var payload = {
                nome: rows[0].usuario,
                email: rows[0].email
            };

            var token = jwebt.sign(payload, config.secretApiKey, { expiresIn: "5h" }); // 5 HORAS
            callback(token, dadosLogin);
        }
    });
    this._conCad.end(console.log(chalk.red('Fechei a conexão com o Banco de Dados.')));
}

module.exports = function(){
    return CadastroDAO;
};