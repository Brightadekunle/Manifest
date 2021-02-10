'use strict';

module.exports = (sequelize, DataTypes) => {
  var Author = sequelize.define('Author', {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  // profilePicture: DataTypes.STRING,
  email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        isEmail: true,
    }},
  });

  Author.associate = (models) => {
    Author.hasMany(models.Post, { onDelete: "CASCADE", })
    Author.hasMany(models.Comment, { onDelete: "CASCADE", })
  }

  return Author;
};
