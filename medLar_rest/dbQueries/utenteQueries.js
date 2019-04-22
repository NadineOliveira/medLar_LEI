var Utentes = require('./ModelConnections').Utentes;

module.exports.getAllUsers = function(){
    result = values;
    Utentes.findAll().then(values => {
        result = values;
    }).catch(err => {
        console.log("Erro getAllUsers");
        result = null;
    })
    return result;
};
