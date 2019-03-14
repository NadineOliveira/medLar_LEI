/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Log', {
    idLog: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false
    },
    User_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'Log'
  });
};
