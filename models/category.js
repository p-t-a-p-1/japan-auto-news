'use strict'
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Categories',
    {
      slug: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )
  Category.associate = function (models) {
    // associations can be defined here
  }
  return Category
}
