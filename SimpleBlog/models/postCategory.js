'use strict';
module.exports = (sequelize, DataTypes) => {
  var PostCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.Post)
    PostCategory.belongsTo(models.Category)
  }
  return Category;
};

// Make sure you complete other models fields