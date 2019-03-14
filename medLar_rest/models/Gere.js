/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Gere', {
    User_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    Medicamento_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Medicamento',
        key: 'id'
      }
    }
  }, {
    tableName: 'Gere'
  });
};
