/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Utente', {
    nr_processo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Genero: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Data_nascimento: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Nome_Encarregado: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Contacto: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Grau_Parentesco: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'Utente'
  });
};
