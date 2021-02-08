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
    postId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post)
    Comment.belongsTo(models.Author)
  }

  return Comment;
};

// Make sure you complete other models fields