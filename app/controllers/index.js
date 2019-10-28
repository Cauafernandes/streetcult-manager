var db = require('../../config/dbCon');

module.exports.index = function(application, req, res){
    var con = new db();
    var EstoqueDAO = new application.app.models.EstoqueDAO(con);
    
    EstoqueDAO.getEstoqueTotal(function(error, result){
        if(error){
            res.redirect('/');
            return;
        }
        res.render("home", { quantidade: result[0] });
    });
}