const Caixa = require('./Caixa');
const Gere = require('./Gere');
const Log = require('./Log');
const Medicamento = require('./Medicamento');
const Notificacao = require('./Notificacao');
const Tarefa = require('./Tarefa');
const User = require('./User');
const Utente = require('./Utente');

User.hasMany(Log,{foreignKey: 'id'});
User.hasMany(Tarefa,{foreignKey: 'id'});
User.belongsToMany(Medicamento,{through: 'Gere', foreignKey: 'id'})
Medicamento.belongsToMany(User,{through: 'Gere', foreignKey: 'id'})

Medicamento.belongsToMany(Utente,{through:'Caixa', foreignKey: 'id'})
Utente.belongsToMany(Medicamento, {through:'Caixa', foreignKey:'id'})

//Caixa.hasMany(Horario)