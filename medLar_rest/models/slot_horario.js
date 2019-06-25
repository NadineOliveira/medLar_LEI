/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slot_horario', {
    quantidade: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    med: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'caixa',
        key: 'med'
      }
    },
    nr_utente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'caixa',
        key: 'utente'
      }
    },
    idHorario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'horario',
        key: 'idHorario'
      }
    },
    estado: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'slot_horario'
  });
};
