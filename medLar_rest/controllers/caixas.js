var Caixa = require('./ModelConnections').caixa;
var Utente = require('./ModelConnections').utente;
var Medicamento = require('./ModelConnections').medicamento;

module.exports.getAllCaixas = async function() {
        var result = [];
        await Caixa.findAll({
            include: [
                {model: Medicamento, attributes: ['nome']},
                {model: Utente, attributes: ['nome','apelido','contacto','contacto_enc']}
            ]
        }).then(values => {
          for(i in values)
            result.push(values[i].dataValues);
        }).catch(err => {
          result = err;
        });
        return result;
};

module.exports.getMedicamentosByUtente = async function(idUtente){
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
        result = err;
    });
    return result;
}

module.exports.getUtentesByMedicamento = async function(idMed){
    var result = [];
    await Caixa.findAll(
        {where: {med: idMed}, 
        include: [{
            model: Utente,
            attributes: ['nome','apelido','contacto','contacto_enc']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.addCaixa = async function(med, nr_utente, data_inicio, data_fim, quantidade) {
    var result;
    await Caixa.create({
        med: med,
        nr_utente: nr_utente,
        data_inicio: data_inicio,
        data_fim: data_fim, 
        quantidade: quantidade
    }).then( value => {
                result = value;
    }).catch(err => {
        result = err
    });
    return result;
}

