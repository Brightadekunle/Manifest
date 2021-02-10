'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  name: DataTypes.STRING
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Post, { onDelete: "CASCADE", through: 'PostCategory' })
  }
  return Category;
};

// Make sure you complete other models fields