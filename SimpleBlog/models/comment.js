'use strict';

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    body: DataTypes.STRING,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { onDelete: "CASCADE", })
    Comment.belongsTo(models.Author, { onDelete: "CASCADE", })
  }

  return Comment;
};

// Make sure you complete other models fields