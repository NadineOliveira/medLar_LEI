/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Medicamento', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dosagem: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    forma: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    unidades: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    laboratorio: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    preco: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    comparticipacao: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'Medicamento'
  });
};
