var db = require('../../config/dbCon');

module.exports.Dashboard = function(application, req, res){
    var conCad = new db(); 
    var EstoqueDAO = new application.app.models.EstoqueDAO(conCad);

    EstoqueDAO.getProdutos(function(error, result){
        if(error){
            res.redirect('/');
            return;
        }

        if(result.length > 0){
            res.render("estoque/dashboard", {products: result});
        } else{
            res.render("estoque/dashboard", {products: null});
        }
    });
}

module.exports.ProdutoCadastrar = function(application, req, res){
    res.render("estoque/cadastrar", {validacao : null, dadosProduto: {}});
}

module.exports.ProdutoCadastrarSalvar = function(application, req, res){
    var dadosProduto = req.body;

    req.assert('nome', 'O nome é obrigatório.').notEmpty();
    req.assert('precoCusto', 'Preço custo é obrigatório.').notEmpty();
    req.assert('precoVenda', 'Preço venda é obrigatório.').notEmpty();
    req.assert('precoVenda', 'Preço venda é menor que o custo.').custom( venda => {
        if ( venda < dadosProduto.precoCusto ) {
            return false;
        } else{
            return true;
        }
    });

    var erros = req.validationErrors();

    if (erros){
        res.render("estoque/cadastrar", {validacao : erros, dadosProduto: dadosProduto});
        return;
    }

    var conCad = new db(); 
    var EstoqueDAO = new application.app.models.EstoqueDAO(conCad);

    EstoqueDAO.cadastrarProduto(dadosProduto, function(error, result){ 
        res.redirect("/estoque/produto/cadastrar");
    });
}