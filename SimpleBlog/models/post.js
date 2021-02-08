'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    post_title: DataTypes.STRING,
    post_body: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.Author)
    Post.hasMany(models.Comment)
    Post.belongsToMany(models.Category, { through: "PostCategory" } )
  }
  return Post;
};

// Make sure you complete other models fields