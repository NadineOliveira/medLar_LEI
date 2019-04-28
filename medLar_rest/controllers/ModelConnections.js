var db = require('../config/database');
const Caixa = db.import('../models/Caixa');
const Horario = db.import('../models/horario');
const Medicamento = db.import('../models/Medicamento');
const Tarefa = db.import('../models/Tarefa');
const Auxiliar = db.import('../models/auxiliar');
var Utente = db.import('../models/Utente');

Auxiliar.hasMany(Tarefa,{foreignKey: 'auxiliar'});
Auxiliar.belongsToMany(Medicamento,{through: 'Gere', foreignKey: 'med'})
Medicamento.belongsToMany(Auxiliar,{through: 'Gere', foreignKey: 'auxiliar'})

Medicamento.belongsToMany(Utente,{through:'Caixa', foreignKey: 'med'})
Utente.belongsToMany(Medicamento, {through:'Caixa', foreignKey:'utente'})

Caixa.belongsToMany(Horario,{through: 'Caixa_Horario', foreignKey:['Caixa_med','Caixa_utente']})
Horario.belongsToMany(Caixa,{through: 'Caixa_Horario', foreignKey:'Horario_idHorario'})

exports.medicamento = Medicamento;
exports.utente = Utente;
exports.auxiliar = Auxiliar;
exports.horario = Horario;
exports.tarefa = Tarefa;
exports.db = db;

