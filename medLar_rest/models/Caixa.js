/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Caixa', {
    Medicamento_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Medicamento',
        key: 'id'
      }
    },
    Utente_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Utente',
        key: 'id'
      }
    },
    data_inicio: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_fim: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    periodo: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'Caixa'
  });
};
