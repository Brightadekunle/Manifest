'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teambright = sequelize.define('Teambright', {
    name: DataTypes.STRING
  });

  Teambright.associate = function(models) {
    models.Teambright.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Teambright;
};
