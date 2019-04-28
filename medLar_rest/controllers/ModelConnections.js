var db = require('../config/database');
const Caixa = db.import('../models/Caixa');
const Horario = db.import('../models/horario');
const Medicamento = db.import('../models/Medicamento');
const Tarefa = db.import('../models/Tarefa');
const Auxiliar = db.import('../models/auxiliar');
const Utente = db.import('../models/Utente');
const Caixa_Horario = db.import('../models/caixa_horario');
const Gere = db.import('../models/Gere');

/*Associações:
    Auxiliar 1-N Tarefa
    Tarefa 1-1 Auxiliar */
Auxiliar.hasMany(Tarefa,{foreignKey: 'nr_auxiliar'});
Tarefa.belongsTo(Auxiliar,{foreignKey: 'nr_auxliar'});

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
    Medicamento 1-N Caixa
    Caixa 1-1 Medicamento
    Utente 1-N Caixa
    Caixa 1-1 Utente
    Utente N-N Medicamento
    Medicamento N-N Utente
*/
Medicamento.hasMany(Caixa,{foreignKey: 'med'});
Caixa.belongsTo(Medicamento,{foreignKey: 'med'});

Utente.hasMany(Caixa,{foreignKey: 'nr_utente'});
Caixa.belongsTo(Utente,{foreignKey: 'nr_utente'});

Medicamento.belongsToMany(Utente,{through:'Caixa', foreignKey: 'med'})
Utente.belongsToMany(Medicamento, {through:'Caixa', foreignKey:'nr_utente'})

/*Associações:
    Caixa_Horario 1-1 Horario
    Horario 1-N Caixa_Horario
    Caixa_Horario 1-1 Caixa
    Caixa 1-N Caixa_Horario
    Caixa N-N Horario
    Horario N-N Caixa
*/
Caixa_Horario.belongsTo(Horario,{foreignKey: ['Caixa_med','Caixa_utente']});
Horario.hasMany(Caixa_Horario,{foreignKey: 'Horario_idHorario'});

Caixa_Horario.belongsTo(Caixa,{foreignKey: ['Caixa_med','Caixa_utente']});
Caixa.hasMany(Caixa_Horario,{foreignKey: ['Caixa_med','Caixa_utente']});

Caixa.belongsToMany(Horario,{through: 'Caixa_Horario', foreignKey:['Caixa_med','Caixa_utente']})
Horario.belongsToMany(Caixa,{through: 'Caixa_Horario', foreignKey:'Horario_idHorario'})

exports.medicamento = Medicamento;
exports.utente = Utente;
exports.auxiliar = Auxiliar;
exports.horario = Horario;
exports.tarefa = Tarefa;
exports.caixa = Caixa;
exports.caixa_horario = Caixa_Horario;
exports.gere = Gere;
exports.db = db;

