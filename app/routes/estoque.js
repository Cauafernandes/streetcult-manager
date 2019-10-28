module.exports = function(application){
    application.get('/estoque', function(req,res){
        application.app.controllers.estoque.Dashboard(application, req, res);
    });

    application.get('/estoque/produto/cadastrar', function(req,res){
        application.app.controllers.estoque.ProdutoCadastrar(application, req, res);
    });

    application.post('/estoque/produto/cadastrar/salvar', function(req,res){
        application.app.controllers.estoque.ProdutoCadastrarSalvar(application, req, res);
    });

    application.get('/estoque/produto/editar', function(req,res){
        application.app.controllers.estoque.ProdutoEditar(application, req, res);
    });

    application.post('/estoque/produto/editar/salvar', function(req,res){
        application.app.controllers.estoque.ProdutoEditarSalvar(application, req, res);
    });

    application.post('/estoque/produto/deletar', function(req,res){
        application.app.controllers.estoque.ProdutoDeletar(application, req, res);
    });
};