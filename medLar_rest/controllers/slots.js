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

module.exports.addSlot = async function(med, nr_utente, data_inicio, data_fim) {
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
module.exports.addSlot_Horario = async function(qt, med, nr_utente, idHorario) {
    var result;
    await SlotHorario.create({
        quantidade: qt,
        med: med,
        nr_utente: nr_utente,
        idHorario: idHorario,
        estado: 0
    }).then( value => {
                result = value;
    }).catch(err => {
        result = err
    });
    return result;
}

module.exports.getHorarioByUtenteMedicamento = async function(idUtente, idMed) {
    var result = [];
    await db.query('select slot_horario.med, slot_horario.nr_utente, slot_horario.quantidade, slot_horario.estado, horario.* from horario '+
                'join slot_horario '+
                'on horario.idHorario = slot_horario.idHorario '+
                'where slot_horario.med = :med AND slot_horario.nr_utente = :utente',
    { replacements: {med: idMed, utente: idUtente}, type: db.QueryTypes.SELECT }
    ).then(projects => {
        result = projects;
    }).catch( err => result=err)
    return result;
}

module.exports.getHorariosMed = async function(idUtente, idMed, datai, dataf) {
    var result = [];
    await db.query('select slot_horario.quantidade, slot_horario.idHorario from slot '+
                'join slot_horario '+
                'on slot_horario.med = slot.med AND slot_horario.nr_utente = slot.nr_utente '+
                'where slot_horario.med = :med AND slot_horario.nr_utente = :utente and '+
                'slot.data_inicio = :di and slot.data_fim = :df',
    { replacements: {med: idMed, utente: idUtente, di:datai,  df: dataf}, type: db.QueryTypes.SELECT }
    ).then(projects => {
        result = projects;
    }).catch( err => result=err)
    console.log(result)
    return result;
}


module.exports.countMedicamentosFalta = async function(idUtente) {
    var result = [];
    await db.query(`select sum(slot_horario.quantidade) as faltam from horario 
                    join slot_horario 
                    on horario.idHorario = slot_horario.idHorario 
                    where slot_horario.nr_utente = :utente AND slot_horario.estado = 0`,
    { replacements: {utente: idUtente}, type: db.QueryTypes.SELECT }
    ).then(projects => {
        result = projects;
    }).catch( err => result=err)
    return result;
}

module.exports.updateSlotHorario = async function(med, utente, horario, estado){
    var result;
    await SlotHorario.update(
      { estado: estado},
      { where: { med: med, nr_utente: utente, idHorario: horario } }
    )
      .then(()=> result = {message: "Alterado com sucesso!"})
      .catch(err=> result = err)
    return result;
}
