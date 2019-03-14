/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telemovel: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_Nacimento: {
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
    cod_Postal: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'User'
  });
};
