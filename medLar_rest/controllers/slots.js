var Slot = require('./ModelConnections').Slot;
var Utente = require('./ModelConnections').utente;
var Medicamento = require('./ModelConnections').medicamento;
var SlotHorario = require('./ModelConnections').Slot_horario;
var Horario = require('./ModelConnections').horario;
var db = require('./ModelConnections').db;

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

module.exports.getHorarioByUtenteMedicamento = async function(idUtente, idMed) {
    var result = [];
    await db.query('select slot_horario.Slot_med, slot_horario.Slot_utente, slot_horario.quantidade, slot_horario.estado, horario.* from horario '+
                'join slot_horario '+
                'on horario.idHorario = slot_horario.Horario_idHorario '+
                'where slot_horario.Slot_med = :med AND Slot_utente = :utente',
    { replacements: {med: idMed, utente: idUtente}, type: db.QueryTypes.SELECT }
    ).then(projects => {
        result = projects;
    }).catch( err => result=err)
    return result;
}


module.exports.updateSlotHorario = async function(med, utente, horario, estado){
    var result;
    await SlotHorario.update(
      { estado: estado},
      { where: { Slot_med: med, Slot_utente: utente, Horario_idHorario: horario } }
    )
      .then(()=> result = {message: "Alterado com sucesso!"})
      .catch(err=> result = err)
    return result;
}
