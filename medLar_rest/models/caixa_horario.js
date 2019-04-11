/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('caixa_horario', {
    quantidade: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Caixa_med: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'caixa',
        key: 'med'
      }
    },
    Caixa_utente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'caixa',
        key: 'utente'
      }
    },
    Horario_idHorario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'horario',
        key: 'idHorario'
      }
    }
  }, {
    tableName: 'caixa_horario'
  });
};
