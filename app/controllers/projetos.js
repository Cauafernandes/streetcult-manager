var db = require('../../config/dbCon');

module.exports.projetos = function(application, req, res){
    var con = new db(); 
    var projetosModel = new application.app.models.ProjetosDAO(con);

    projetosModel.getProjetos(function(error, result){
    res.render("projetos/projetos", {projeto : result});
    });
}

module.exports.projeto = function(application, req, res){
    var con = new db(); 
    var projetosModel = new application.app.models.ProjetosDAO(con);

    var id_projeto = req.query;

    projetosModel.getProjeto(id_projeto, function(error, result){
        res.render("projetos/projeto", {projeto : result});
    });
}