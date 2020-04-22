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
      'Categories',
      [
        {
          slug: 'general',
          name: '一般',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'business',
          name: 'ビジネス',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'entertainment',
          name: 'エンタメ',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'health',
          name: '健康',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'science',
          name: '科学',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'sports',
          name: 'スポーツ',
          createdAt: now,
          updatedAt: now,
        },
        {
          slug: 'technology',
          name: 'テクノロジー',
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
    return queryInterface.bulkDelete('Categories', null, {})
  },
}
