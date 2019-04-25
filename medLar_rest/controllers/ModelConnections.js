var db = require('../config/database');
const Caixa = db.import('../models/Caixa');
const Horario = db.import('../models/horario');
const Medicamento = db.import('../models/Medicamento');
const Tarefa = db.import('../models/Tarefa');
const Auxiliar = db.import('../models/auxiliar');
var Utente = db.import('../models/Utente');

Auxiliar.hasMany(Tarefa,{foreignKey: 'id'});
Auxiliar.belongsToMany(Medicamento,{through: 'Gere', foreignKey: 'id'})
Medicamento.belongsToMany(Auxiliar,{through: 'Gere', foreignKey: 'id'})

Medicamento.belongsToMany(Utente,{through:'Caixa', foreignKey: 'id'})
Utente.belongsToMany(Medicamento, {through:'Caixa', foreignKey:'id'})

Caixa.belongsToMany(Horario,{through: 'Caixa_Horario', foreignKey:['med','utente']})
Horario.belongsToMany(Caixa,{through: 'Caixa_Horario', foreignKey:'idHorario'})

exports.medicamento = Medicamento;
exports.utente = Utente;
exports.auxiliar = Auxiliar;

