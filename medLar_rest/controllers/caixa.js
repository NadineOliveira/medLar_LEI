var Utente = require('./ModelConnections').utente;
var Caixa = require('./ModelConnections').caixa;
var Medicamento = require('./ModelConnections').medicamento;

module.exports.getMedicamentoByUtente= async function(idUtente){
    var result = [];
    await Caixa.findAll(
        {where: {nr_utente: idUtente}, 
        include: [{
            model: Medicamento,
            attributes: ['nome']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        console.log("Erro listar medicamentos -> "+ err);
        result = err;
    });
    return result;
};