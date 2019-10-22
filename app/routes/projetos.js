module.exports = function(application){
     
    application.get('/projetos', function(req,res){
        application.app.controllers.projetos.projetos(application, req, res);
    });

    application.get('/projeto', function(req,res){
        application.app.controllers.projetos.projeto(application, req, res);
    });
};

