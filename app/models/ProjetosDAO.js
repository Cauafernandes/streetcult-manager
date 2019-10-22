function ProjetosDAO(con){
    this._con = con;
}

ProjetosDAO.prototype.getProjetos = function(callback){
    this._con.query('select * from projeto order by data_projeto desc', callback);
};

ProjetosDAO.prototype.getProjeto = function(id_projeto, callback){
    this._con.query('select * from projeto where id_projeto = ' + id_projeto.id_projeto, callback)
}

ProjetosDAO.prototype.salvarProjeto = function(projeto, callback){
    this._con.query('insert into projeto set ?', projeto, callback)
}

ProjetosDAO.prototype.get5UltimosProjetos = function(callback){
    this._con.query('select * from projeto order by data desc limit 8', callback)
}

module.exports = function(){
    return ProjetosDAO;
};