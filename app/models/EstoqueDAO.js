function EstoqueDAO(con){
    this._con = con;
}

//---------------------------------------------
// ACOES DO PRODUTO
//---------------------------------------------
EstoqueDAO.prototype.cadastrarProduto = function(produto, callback){
    this._con.query('INSERT INTO produtos SET ?', produto, callback)
}

EstoqueDAO.prototype.getProduto = function(produto, callback){
    this._con.query('SELECT * FROM produtos WHERE id = ' + produto.produtoid, callback)
}

EstoqueDAO.prototype.updateProduto = function(produtoid, dadosProduto, callback){
    this._con.query('UPDATE produtos SET quantity = ' + dadosProduto.quantity + ', nome = "' + dadosProduto.nome + '", precoCusto = "' + dadosProduto.precoCusto + '", precoVenda = "' + dadosProduto.precoVenda + '" where id = ' + produtoid.produtoid + '', dadosProduto, callback)
}

EstoqueDAO.prototype.deleteProduto = function(produtoid, dadosProduto, callback){
    this._con.query('DELETE FROM produtos WHERE id = ' + produtoid.produtoid + '', dadosProduto, callback)
}

//---------------------------------------------
// ACOES DO ESTOQUE
//---------------------------------------------
EstoqueDAO.prototype.getProdutos = function(produto, callback){
    this._con.query('SELECT * FROM produtos', produto, callback)
}

EstoqueDAO.prototype.getEstoqueTotal = function(produto, callback){
    this._con.query('SELECT SUM(quantity) AS quantidade FROM produtos', produto, callback)
}

module.exports = function(){
    return EstoqueDAO;
};