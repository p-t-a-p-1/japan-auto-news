'use strict'
const loader = require('./sequelize-loader')
const Sequelize = loader.Sequelize

const Comment = loader.database.define(
  'comments',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    postId: {
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hostname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    goodCount: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    badCount: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0,
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
        fields: ['postId'],
      },
    ],
  }
)

module.exports = Comment
