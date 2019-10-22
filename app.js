var app     = require('./config/server');
var chalk   = require('chalk');

//var rotaProjectADD = require('./app/routes/projectadd')(app);
//var rotaProjetos = require('./app/routes/projetos')(app);
//var rotaIndex = require('./app/routes/index')(app);

var port = 8080
app.listen(port, function(){
    console.log(chalk.yellow("Servidor inicializado na porta: ") + chalk.red(port))
});