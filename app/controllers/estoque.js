var db = require('../../config/dbCon');

module.exports.ProdutoCadastrar = function(application, req, res){
    res.render("estoque/cadastrar", {validacao : null, dadosUser: {}});
}

module.exports.ProdutoCadastrarSalvar = function(application, req, res){
    var dadosUser = req.body;

    req.assert('usuario', 'O nome é obrigatório.').notEmpty();
    req.assert('senha', 'A senha é obrigatória.').notEmpty();
    req.assert('email', 'Informe um e-mail valido.').notEmpty();

    var erros = req.validationErrors();

    if (erros){
        res.render("estoque/cadastrar", {validacao : erros, dadosUser: dadosUser});
        return;
    }

    var conCad = new db(); 
    var CadastroModel = new application.app.models.CadastroDAO(conCad);

    CadastroModel.cadastrarUsuario(dadosUser, function(error, result){ 
        res.redirect('/produto/cadastrar');
    });
}