var passport = require('passport');

module.exports = function(application){
    application.get('/login', function(req,res){
        application.app.controllers.login.login(application, req, res);
    });

    application.post('/login/autenticar', function(req, res){
        application.app.controllers.login.autenticar(application, req, res);
    });

    application.post('/login/authenticatetoken', passport.authenticate('bearer', { session: false }), function(req, res){
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ a: 1 }));
    });
};