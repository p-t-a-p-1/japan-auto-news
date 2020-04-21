/**
 * sequelizeの読み込みの定義用ファイル
 */
'use strict'
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/localnews',
  {
    operatorsAliases: false,
  }
)

module.exports = {
  database: sequelize,
  Sequelize: Sequelize,
}
