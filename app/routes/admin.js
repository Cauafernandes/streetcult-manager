module.exports = function(application){
    application.get('/admin/dashboard', function(req,res){
        application.app.controllers.admin.admindash(application, req, res);
    });

    application.get('/admin/adicionarprojeto', function(req,res){
        application.app.controllers.admin.adicionarprojeto(application, req, res);
    });

    application.post('/projetos/salvar', function(req,res){
        application.app.controllers.admin.projetos_salvar(application, req, res);
    });
};