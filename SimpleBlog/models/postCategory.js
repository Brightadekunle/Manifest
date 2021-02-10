'use strict';
module.exports = (sequelize, DataTypes) => {
  var PostCategory = sequelize.define('PostCategory', {
  });

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.Post)
    PostCategory.belongsTo(models.Category)
  }
  return PostCategory;
};

// Make sure you complete other models fields