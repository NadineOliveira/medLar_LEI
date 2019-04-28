/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tarefa', {
    id_Tarefa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    nr_auxiliar: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'auxiliar',
        key: 'id'
      }
    }
  }, {
    tableName: 'tarefa'
  });
};
