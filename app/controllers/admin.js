var db = require('../../config/dbCon');

module.exports.admindash = function(application, req, res){
    res.render("admin/dashboard", {});
}

// ADICIONAR PROJETO --------------------------------------------------------------------------------------
module.exports.adicionarprojeto = function(application, req, res){
    res.render("admin/projectadd", {validacao : null, projetos: {}});
}

module.exports.projetos_salvar = function(application, req, res){
    var projetos = req.body;

    req.assert('titulo', 'O Título é obrigatório.').notEmpty();
    req.assert('resumo', 'O Resumo é obrigatório.').notEmpty();
    req.assert('resumo', 'O Resumo deve conter entre 10 a 100 caracteres.').len(10,100);
    req.assert('autor', 'Obrigatório inserir um Desenvolvedor.').notEmpty();
    req.assert('projeto', 'Obrigatório inserir um tipo de projeto.').notEmpty();
    req.assert('data_projeto', 'Por favor, selecione a data de entrega.').notEmpty();

    var erros = req.validationErrors();

    if (erros){
        res.render("admin/projectadd", {validacao : erros, projetos: projetos});
        return;
    }

    var con = new db();
    var ProjetosDAO = new application.app.models.ProjetosDAO(con);

    ProjetosDAO.salvarProjeto(projetos, function(error, result){
        res.redirect('/projetos');
    });
}