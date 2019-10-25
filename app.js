var app     = require('./config/server');
var chalk   = require('chalk');

var port = 8080
app.listen(port, function(){
    console.log(chalk.yellow("Servidor inicializado na porta: ") + chalk.red(port))
});