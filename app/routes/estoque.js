module.exports = function(application){
    application.get('/produto/cadastrar', function(req,res){
        application.app.controllers.estoque.ProdutoCadastrar(application, req, res);
    });

    application.post('/produto/cadastrar/salvar', function(req,res){
        application.app.controllers.estoque.ProdutoCadastrarSalvar(application, req, res);
    });
};