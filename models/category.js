'use strict'
const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize

const Category = loader.database.define(
  'categories',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

module.exports = Category
