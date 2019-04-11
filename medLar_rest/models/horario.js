/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('horario', {
    idHorario: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dia: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    periodo: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'horario'
  });
};
