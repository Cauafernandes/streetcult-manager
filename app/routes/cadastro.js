module.exports = function(application){
    application.get('/cadastrar', function(req,res){
        application.app.controllers.cadastro.cadastrar(application, req, res);
    });

    application.post('/cadastrar/salvar', function(req,res){
        application.app.controllers.cadastro.cadastrarUsuario(application, req, res);
    });
};