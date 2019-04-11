/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auxiliar', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apelido: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_nascimento: {
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
    tableName: 'auxiliar'
  });
};
