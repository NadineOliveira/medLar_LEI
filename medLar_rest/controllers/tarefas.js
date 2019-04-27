var Tarefa = require('./ModelConnections').tarefa;

module.exports.getAllTarefas = async function(){
    var result = [];
    await Tarefa.findAll().then(values => {
      for(i in values)  
        result.push(values[i].dataValues);
    }).catch(err => {
      result = err;
    });
    return result;
};

module.exports.getTarefasById = async function(id){
    var result;
    await Tarefa.findOne({
        where: {
          id_Tarefa: id
        }}).then(values => {
          result = values.dataValues;
        }).catch(err => {
          result = err;
      });
    return result;
};

module.exports.addTarefa = async function(id, nome, descricao, data, estado, auxiliar){
    var result;
    await Tarefa.create({
      id_Tarefa: id, 
      nome: nome, 
      descricao: descricao, 
      genero: genero,
      data: data, 
      estado: estado,
      auxiliar: auxiliar
    })
    .then(() => Tarefa.findOrCreate({
      where: {
        id_Tarefa: id
      }})).then(([tr, created]) => {
            result = tr;
    }).catch(err => {
      result = err;
    });
    return result;
}
