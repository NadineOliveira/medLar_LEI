var db = require('../config/database');
const Caixa = db.import('./Caixa');
const Horario = db.import('./horario');
const Medicamento = db.import('./Medicamento');
const Tarefa = db.import('./Tarefa');
const Auxiliar = db.import('./auxiliar');
const Utente = db.import('./Utente');

Auxiliar.hasMany(Tarefa,{foreignKey: 'id'});
Auxiliar.belongsToMany(Medicamento,{through: 'Gere', foreignKey: 'id'})
Medicamento.belongsToMany(Auxiliar,{through: 'Gere', foreignKey: 'id'})

Medicamento.belongsToMany(Utente,{through:'Caixa', foreignKey: 'id'})
Utente.belongsToMany(Medicamento, {through:'Caixa', foreignKey:'id'})

Caixa.belongsToMany(Horario,{through: 'Caixa_Horario', foreignKey:['med','utente']})
Horario.belongsToMany(Caixa,{through: 'Caixa_Horario', foreignKey:'idHorario'})