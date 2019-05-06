/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slot', {
    med: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'medicamento',
        key: 'id_med'
      }
    },
    nr_utente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utente',
        key: 'nr_processo'
      }
    },
    data_inicio: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_fim: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'slot'
  });
};
