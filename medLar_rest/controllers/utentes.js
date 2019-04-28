var Utente = require('./ModelConnections').utente;

module.exports.getAllUtentes = async function(){
    var result = [];
    await Utente.findAll().then(values => {
      for(i in values)  
        result.push(values[i].dataValues);
    }).catch(err => {
      result = err;
    });
    return result;
};

module.exports.getUtentesByEstado = async function(estado){
  var result;
  await Utente.findAll({
      where: {estado: estado}})
      .then(values => {
      result = values;
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.getUtenteById = async function(id){
    var result;
    await Utente.findOne({
        where: {
          nr_processo: id
        }}).then(values => {
          result = values.dataValues;
        }).catch(err => {
          result = err;
      });
    return result;
};

module.exports.addUtente = async function(np, nome,apelido, genero, data_nascimento, contacto, encarregado,
  parentesco, contacto_enc, rua, localidade, codigo_postal, cidade, estado){
  var result;
  await Utente.create({
    nr_processo: np, 
    nome: nome, 
    apelido: apelido, 
    genero: genero,
    data_nascimento: data_nascimento, 
    contacto: contacto,
    encarregado: encarregado,
    parentesco: parentesco, 
    contacto_enc: contacto_enc, 
    rua: rua, 
    localidade: localidade,
    codigo_postal: codigo_postal, 
    cidade: cidade, 
    estado: estado})
  .then(() => Utente.findOrCreate({
    where: {
      nr_processo: np
    }})).then(([ut, created]) => {
          result = ut;
  }).catch(err => {
    result = err;
  });
  return result;
}

module.exports.mudarEstadoUtenteById = async function(np, estado){
  var result;
  await Utente.update(
    { estado: estado},
    { where: { nr_processo: np } }
  )
    .then(()=> result = {message: "Utente "+id+" mudado para estado "+estado+"!"})
    .catch(err=> result = err)
  return result;
}

module.exports.updateUtente = async function(np, nome,apelido, genero, data_nascimento, contacto, encarregado,
  parentesco, contacto_enc, rua, localidade, codigo_postal, cidade, estado){
  var result;
  await Utente.update({
    nome: nome, 
    apelido: apelido, 
    genero: genero,
    data_nascimento: data_nascimento, 
    contacto: contacto,
    encarregado: encarregado,
    parentesco: parentesco, 
    contacto_enc: contacto_enc, 
    rua: rua, 
    localidade: localidade,
    codigo_postal: codigo_postal, 
    cidade: cidade, 
    estado: estado},{
      where: {nr_processo: np}
    })
    .then(()=> result = {message: "Utente "+id+" Alterado!"})
    .catch(err=> result = err)
  return result;
}