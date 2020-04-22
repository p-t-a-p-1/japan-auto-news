'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Posts',
    {
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      thumbImg: DataTypes.STRING,
      pv: DataTypes.INTEGER.UNSIGNED,
      author: DataTypes.STRING,
      originUrl: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  )
  Post.associate = function (models) {
    // associations can be defined here
  }
  return Post
}
