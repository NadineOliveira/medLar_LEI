var Gere = require('./ModelConnections').gere;
var Auxiliar = require('./ModelConnections').auxiliar;
var Medicamento = require('./ModelConnections').medicamento;

module.exports.getAllGestoes = async function() {
        var result = [];
        await Gere.findAll({
            include: [
                {model: Medicamento, attributes: ['id_med','nome']},
                {model: Auxiliar, attributes: ['id','nome','apelido','contacto']}
            ]
        }).then(values => {
          for(i in values)
            result.push(values[i].dataValues);
        }).catch(err => {
          result = err;
        });
        return result;
};

module.exports.getMedicamentosByAuxiliar = async function(id){
    var result = [];
    await Gere.findAll(
        {where: {nr_auxiliar: id}, 
        include: [{
            model: Medicamento,
            attributes: ['id_med','nome']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.getAuxiliarByMedicamento = async function(idMed){
    var result = [];
    await Gere.findAll(
        {where: {med: idMed}, 
        include: [{
            model: Auxiliar,
            attributes: ['id','nome','apelido','contacto']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.addGestao = async function(nr_auxiliar, med, data, quantidade) {
    var result;
    await Gere.create({
        nr_auxiliar: nr_auxiliar,
        med: med,
        data: data, 
        quantidade: quantidade
    }).then( value => {
                result = value;
    }).catch(err => {
        result = err
    });
    return result;
}