/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tarefa', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_limite: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
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
    tableName: 'Tarefa'
  });
};
