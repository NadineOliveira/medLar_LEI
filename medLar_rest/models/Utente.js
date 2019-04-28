/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utente', {
    nr_processo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apelido: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    encarregado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    parentesco: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contacto_enc: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    rua: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    localidade: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    codigo_postal: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'utente'
  });
};
