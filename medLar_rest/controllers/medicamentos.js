var Medicamento = require('./ModelConnections').medicamento;

module.exports.getAllMedicamentos = async function() {
    var result = [];
    await Medicamento.findAll().then(values => {
        for(i in values)
          result.push(values[i].dataValues);
      }).catch(err => {
        result = err;
      });
      return result;
};

