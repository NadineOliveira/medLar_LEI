var Utente = require('./ModelConnections').utente;

module.exports.getAllUsers = async function(){
    var result;

    await Utente.findAll().then(values => {
      result = values[0].dataValues;
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
};

module.exports.getUsersAtivos = async function(){
  var result;
  await Utente.findAll({
      where: {estado: 1}})
      .then(values => {
      result = values;
  }).catch(err => {
    result = null;
  });
  console.log(result)
  return result;
};

module.exports.getUsersInativos = async function(){
  var result;
  await Utente.findAll({
      where: {estado: 0}})
      .then(values => {
      result = values;
  }).catch(err => {
    result = null;
  });
  console.log(result)
  return result;
};

module.exports.getUtenteById = async function(id){
    var result;
    await Utente.findOne({
        where: {nr_processo: id}})
        .then(values => {
        result = values;
        console.log("Entrou")
    }).catch(err => {
      result = null;
    });
    console.log(result)
    return result;
};

module.exports.addUtente = function(np, nome,apelido, genero, data_nascimento, contacto, encarregado,
  parentesco, contacto_enc, rua, localidade, codigo_postal, cidade){
  Utente.create({nr_processo: np, nome: nome, apelido: apelido, genero: genero, data_nascimento: data_nascimento, contacto: contacto,
                encarregado: encarregado,parentesco: parentesco, contacto_enc: contacto_enc, rua: rua, localidade: localidade,
                codigo_postal: codigo_postal, cidade: cidade, estado: 1})
  .then(() => Utente.findOrCreate({where: {nr_processo: np}, defaults: {estado: 1}}))
  .then(([ut, created]) => {
    console.log(ut.get({
      plain: true
    }))
    console.log(created)

  }).catch(err => {
    console.log("Erro a criar novo utente");
  });
}

module.exports.desativarUtenteById = function(id){
  Utente.update(
    { estado: 0},
    { where: { nr_processo: id } }
  )
    .then(result =>
      console.log(result)
    )
    .catch(err =>
      console.log(err)
    )
}