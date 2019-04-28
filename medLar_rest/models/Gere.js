/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gere', {
    nr_auxiliar: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'auxiliar',
        key: 'id'
      }
    },
    med: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medicamento',
        key: 'id_med'
      }
    },
    data: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    quantidade: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'gere'
  });
};
