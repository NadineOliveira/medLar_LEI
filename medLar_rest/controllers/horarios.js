var Horario = require('./ModelConnections').horario;
var db = require('./ModelConnections').db

module.exports.getAllHorarios = async () => {
    var result = [];
    await Horario.findAll().then(values => {
        for(i in values)
            result.push(values[i].dataValues);
    }).catch(err => result = err)
    return result;
}

