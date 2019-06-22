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

module.exports.getAllTarefasByAuxiliar = async function(id){
  var result = [];
  await Tarefa.findAll({where: {nr_auxiliar: id}}).then(values => {
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

module.exports.getTarefasByEstado = async function(estado){
  var result = [];
  await Tarefa.findAll({where: {estado: estado}}).then(values => {
    for(i in values)  
      result.push(values[i].dataValues);
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.getTarefasByAuxiliarAndEstado = async function(id,estado){
  var result = [];
  await Tarefa.findAll({where: {auxiliar: id, estado: estado}}).then(values => {
    for(i in values)  
      result.push(values[i].dataValues);
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.addTarefa = async function(nome, descricao, data, estado, auxiliar){
    var result;
    await Tarefa.create({
      nome: nome, 
      descricao: descricao, 
      data: data, 
      estado: estado,
      auxiliar: auxiliar
    }).then(tr => {
            result = tr;
    }).catch(err => {
      result = err;
    });
    return result;
}

module.exports.concluirTarefa = async function(id) {
  var result;
  await Tarefa.update(
    { estado: 1},
    { where: { id_Tarefa: id } }
  )
    .then(()=>{
      result = Tarefa.findOne({where: {id_Tarefa: id}})
    })
    .catch(err=> result = err)
  return result;
}