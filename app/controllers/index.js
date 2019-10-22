var db = require('../../config/dbCon');

module.exports.index = function(application, req, res){
    res.render("home");
}