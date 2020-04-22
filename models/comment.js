'use strict'
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comments',
    {
      postId: DataTypes.INTEGER,
      message: DataTypes.STRING,
      hostname: DataTypes.STRING,
      ip: DataTypes.STRING,
      goodCount: DataTypes.INTEGER.UNSIGNED,
      badCount: DataTypes.INTEGER.UNSIGNED,
      createdAt: DataTypes.DATE,
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  )
  Comment.associate = function (models) {
    // associations can be defined here
  }
  return Comment
}
