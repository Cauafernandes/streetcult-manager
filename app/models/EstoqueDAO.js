function EstoqueDAO(con){
    this._con = con;
}

EstoqueDAO.prototype.cadastrarProduto = function(produto, callback){
    this._con.query('insert into produtos set ?', produto, callback)
}

EstoqueDAO.prototype.getProdutos = function(produto, callback){
    this._con.query('select * from produtos', produto, callback)
}

module.exports = function(){
    return EstoqueDAO;
};