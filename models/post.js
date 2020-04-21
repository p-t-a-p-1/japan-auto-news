'use strict'
const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize

const Post = loader.database.define(
  'posts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    thumbImg: {
      type: Sequelize.STRING,
    },
    pv: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    originUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['categoryId'],
      },
    ],
  }
)

module.exports = Post
