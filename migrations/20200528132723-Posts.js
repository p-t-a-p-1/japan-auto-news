'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' },
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
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Posts')
  },
}
