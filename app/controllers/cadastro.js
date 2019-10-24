var db = require('../../config/dbCon');

module.exports.cadastrar = function(application, req, res){
    res.render("usuario/cadastrar", {validacao : null, dadosUser: {}});
}

module.exports.cadastrarUsuario = function(application, req, res){
    var dadosUser = req.body;
    var crypto = require('crypto');

    req.assert('usuario', 'O nome é obrigatório.').notEmpty();
    req.assert('senha', 'A senha é obrigatória.').notEmpty();
    req.assert('email', 'Informe um e-mail valido.').notEmpty();

    var erros = req.validationErrors();

    if (erros){
        res.status(401);
        res.render("usuario/cadastrar", {validacao : erros, dadosUser: dadosUser});
        return;
    }

    var conCad = new db(); 
    var CadastroModel = new application.app.models.CadastroDAO(conCad);

    CadastroModel.cadastrarUsuario(dadosUser, function(error, result){ 
        res.redirect('/cadastrar');
    });
}