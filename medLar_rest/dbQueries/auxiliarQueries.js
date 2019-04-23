var Auxiliar = require('./ModelConnections').auxiliar;

module.exports.getAllAuxiliares = async function(){
    var result;

    await Auxiliar.findAll().then(values => {
      result = values[0].dataValues;
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
};

module.exports.getAuxiliaresAtivos = async function(){
    var result;
    await Auxiliar.findAll({
        where: {estado: 1}})
        .then(values => {
        result = values;
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
  };
  
  module.exports.getAuxiliarInativos = async function(){
    var result;
    await Auxiliar.findAll({
        where: {estado: 0}})
        .then(values => {
        result = values;
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
  };

  module.exports.getAuxiliarById = async function(id){
    var result;
    await Auxiliar.findOne({
        where: {id: id}})
        .then(values => {
        result = values;
        console.log("Entrou")
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
};

module.exports.addAuxiliar = function(id,password,contacto,nome,apelido,
    data_nascimento,rua,localidade,codigo_postal,cidade){
    Auxiliar.create({id: id, password: password, contacto: contacto,nome: nome, apelido: apelido,
        data_nascimento: data_nascimento, rua: rua, localidade: localidade,
        codigo_postal: codigo_postal, cidade: cidade, estado: 1})
    .then(() => Auxiliar.findOrCreate({where: {id: id}, defaults: {estado: 1}}))
    .then(([ax, created]) => {
      console.log(ax.get({
        plain: true
      }))
      console.log(created)
  
    }).catch(err => {
      console.log("Erro a criar novo utente");
    });
  }

  module.exports.desativarAuxiliarById = function(id){
    Auxiliar.update(
      { estado: 0},
      { where: { id: id } }
    )
      .then(result =>
        console.log(result)
      )
      .catch(err =>
        console.log(err)
      )
  }