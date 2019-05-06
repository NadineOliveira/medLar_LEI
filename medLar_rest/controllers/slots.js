var Slot = require('./ModelConnections').Slot;
var Utente = require('./ModelConnections').utente;
var Medicamento = require('./ModelConnections').medicamento;
var SlotHorario = require('./ModelConnections').Slot_horario;
var Horario = require('./ModelConnections').horario;

module.exports.getAllSlots = async function() {
        var result = [];
        await Slot.findAll({
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
    await Slot.findAll(
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
    await Slot.findAll(
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

module.exports.addSlot = async function(med, nr_utente, data_inicio, data_fim, quantidade) {
    var result;
    await Slot.create({
        med: med,
        nr_utente: nr_utente,
        data_inicio: data_inicio,
        data_fim: data_fim
    }).then( value => {
                result = value;
    }).catch(err => {
        result = err
    });
    return result;
}

module.exports.getHorarioByUtenteMedicamento = async function(idMed, idUtente) {
    var result = [];
    await SlotHorario.findAll(
        {where: {Slot_med: idMed, Slot_utente: idUtente}, 
        include: [
            {model: Slot, include: [
                {model: Medicamento, attributes: ['nome']},
                {model: Utente, attributes: ['nome','apelido','contacto','contacto_enc']}]
            },
            {model: Horario, attributes: ['dia','periodo']}
        ]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}
