/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('medicamento', {
    id_med: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    preco: {
      type: "DOUBLE",
      allowNull: false
    },
    lab: {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    uni_emb: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    formato: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dosagem: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'medicamento'
  });
};
