module.exports = function(application){
    application.get('/admin/cadastrar', function(req,res){
        application.app.controllers.cadastro.cadastrar(application, req, res);
    });

    application.post('/admin/cadastrar/salvar', function(req,res){
        application.app.controllers.cadastro.cadastrarUsuario(application, req, res);
    });
};