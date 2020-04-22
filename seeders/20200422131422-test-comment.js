'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const now = new Date()
    return queryInterface.bulkInsert(
      'Comments',
      [
        {
          postId: 1,
          message: 'コメント1',
          hostname: 'testpc',
          ip: '111.111.11.11',
          goodCount: 3,
          badCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          postId: 2,
          message: 'コメント2',
          hostname: 'testpc2',
          ip: '222.222.22.22',
          goodCount: 3,
          badCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          postId: 2,
          message: 'コメント3',
          hostname: 'testpc3',
          ip: '333.333.33.33',
          goodCount: 3,
          badCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          postId: 4,
          message: 'コメント4',
          hostname: 'testpc4',
          ip: '444.444.44.44',
          goodCount: 3,
          badCount: 0,
          createdAt: now,
          updatedAt: now,
        },
        {
          postId: 1,
          message: 'コメント5',
          hostname: 'testpc5',
          ip: '555.555.55.55',
          goodCount: 3,
          badCount: 0,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Comments', null, {})
  },
}
