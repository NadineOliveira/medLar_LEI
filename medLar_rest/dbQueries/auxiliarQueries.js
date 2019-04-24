var Auxiliar = require('./ModelConnections').auxiliar;
var bcrypt = require('bcryptjs');

module.exports.getAllAuxiliares = async function(){
  var result = [];
  await Auxiliar.findAll().then(values => {
    for(aux in values)
      result.push(values[aux].dataValues);
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.getAuxiliaresByEstado = async function(estado){
  var result = [];
  await Auxiliar.findAll({
      where: {
        estado: estado
    }}).then(values => {
        for(aux in values)
          result.push(values[aux].dataValues);
    }).catch(err => {
      result = err;
  });
  return result;
};  

module.exports.addAuxiliar = async function(id,password,contacto,nome,apelido,
  data_nascimento,rua,localidade,codigo_postal,cidade,estado){
    
  var hash = await bcrypt.hash(password, 10);

  var result;

  await Auxiliar.create({
    id: id,
    password: hash,
    contacto: contacto,
    nome: nome, 
    apelido: apelido, 
    data_nascimento: data_nascimento, 
    rua: rua, 
    localidade: localidade,
    codigo_postal: codigo_postal, 
    cidade: cidade, 
    estado: estado
  }).then(() => Auxiliar.findOrCreate({
        where: {
          id: id
        }, defaults: {
          estado: 1
        }})).then(([ax, created]) => {
            result = ax;
  }).catch(err => {
    result = err
  });
  return result;
}

module.exports.mudarEstadoAuxiliarById = async function(id, estado){
  var result;
  await Auxiliar.update(
    { estado: estado},
    { where: { id: id } }
  )
    .then(()=> result = {message: "Utilizador "+id+" mudado para estado "+estado+"!"})
    .catch(err=> result = err)
  return result;
}

module.exports.getAuxiliarById = async (id) => {
  var result;
  await Auxiliar.findOne({
    where: {
      id: id
    }
  }).then(values => {
      result = values.dataValues;
  }).catch(err => {
      result = err
  });
  return result
};

module.exports.validatePassword = async (id, password) => {
  var auxiliar = await this.getAuxiliarById(id)
  
  if(!auxiliar) 
      throw new Error("Utilizador não encontrado!")

  var compare = await bcrypt.compare(password, auxiliar.password)
  
  if(!compare)
      throw new Error ("Invalid password")
  
  return auxiliar
}