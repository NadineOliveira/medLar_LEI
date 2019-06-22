var db = require('../config/database');
const Slot = db.import('../models/Slot');
const Horario = db.import('../models/horario');
const Medicamento = db.import('../models/Medicamento');
const Tarefa = db.import('../models/Tarefa');
const Auxiliar = db.import('../models/auxiliar');
const Utente = db.import('../models/Utente');
const Slot_Horario = db.import('../models/Slot_horario');
const Gere = db.import('../models/Gere');

/*Associações:
    Auxiliar 1-N Tarefa
    Tarefa 1-1 Auxiliar */
Auxiliar.hasMany(Tarefa,{foreignKey: 'nr_auxiliar'});
Tarefa.belongsTo(Auxiliar,{foreignKey: 'nr_auxiliar'});

/*Associações:
    Auxiliar 1-N Gere
    Gere 1-1 Auxiliar
    Medicamento 1-N Gere
    Gere 1-1 Medicamento
    Auxiliar N-N Medicamento*/
Auxiliar.hasMany(Gere,{foreignKey: 'nr_auxiliar'});
Gere.belongsTo(Auxiliar,{foreignKey: 'nr_auxiliar'});

Medicamento.hasMany(Gere,{foreignKey: 'med'});
Gere.belongsTo(Medicamento,{foreignKey: 'med'});

Auxiliar.belongsToMany(Medicamento,{through: 'Gere', foreignKey: 'med'})
Medicamento.belongsToMany(Auxiliar,{through: 'Gere', foreignKey: 'nr_auxiliar'})

/*Associações:
    Medicamento 1-N Slot
    Slot 1-1 Medicamento
    Utente 1-N Slot
    Slot 1-1 Utente
    Utente N-N Medicamento
    Medicamento N-N Utente
*/
Medicamento.hasMany(Slot,{foreignKey: 'med'});
Slot.belongsTo(Medicamento,{foreignKey: 'med'});

Utente.hasMany(Slot,{foreignKey: 'nr_utente'});
Slot.belongsTo(Utente,{foreignKey: 'nr_utente'});

Medicamento.belongsToMany(Utente,{through:'Slot', foreignKey: 'med'})
Utente.belongsToMany(Medicamento, {through:'Slot', foreignKey:'nr_utente'})

/*Associações:
    Slot_Horario 1-1 Horario
    Horario 1-N Slot_Horario
    Slot_Horario 1-1 Slot
    Slot 1-N Slot_Horario
    Slot N-N Horario
    Horario N-N Slot
*/
Slot_Horario.belongsTo(Horario,{foreignKey: 'Horario_idHorario'});
Horario.hasMany(Slot_Horario,{foreignKey: 'Horario_idHorario'});

Slot_Horario.belongsTo(Slot,{foreignKey: ['Slot_med','Slot_utente']});
Slot.hasMany(Slot_Horario,{foreignKey: ['Slot_med','Slot_utente']});

Slot.belongsToMany(Horario,{through: 'Slot_Horario', foreignKey:['Slot_med','Slot_utente']})
Horario.belongsToMany(Slot,{through: 'Slot_Horario', foreignKey:'Horario_idHorario'})

exports.medicamento = Medicamento;
exports.utente = Utente;
exports.auxiliar = Auxiliar;
exports.horario = Horario;
exports.tarefa = Tarefa;
exports.Slot = Slot;
exports.Slot_horario = Slot_Horario;
exports.gere = Gere;
exports.db = db;

