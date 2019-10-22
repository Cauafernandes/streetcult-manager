var mysql   = require('mysql');
var chalk   = require('chalk');

var conMySQL = function(){
    console.log(chalk.cyan('---------------------------------------'));
    console.log(chalk.cyan('Houve uma conexão com o Banco de Dados.'));
    return mysql.createConnection({
        host : 'localhost',
        port : '3306',
        user : 'root',
        password : '',
        database : 'gdg-func',
        socketPath: false,
        connectionLimit: 5,
        typeCast: function castField( field, useDefaultTypeCasting ) {
            if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
                var bytes = field.buffer();
                return( bytes[ 0 ] === 1 );
            } return( useDefaultTypeCasting() );
        }
    });
};

module.exports = conMySQL;