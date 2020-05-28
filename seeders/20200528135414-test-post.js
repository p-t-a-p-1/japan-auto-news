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
      'Posts',
      [
        {
          categoryId: 1,
          title:
            '短編ストリーミングサブスクのQuibiがサービス開始を前に約800億円を調達',
          content:
            ' The Wall Street Journal（ウォール・ストリート・ジャーナル）紙によると、正式なサービス開始まであと1か月余りというタイミングで、短編ストリーミングサブスクサービスのQuibi（クイビー）が7億5000万ドル（約800億円）の新規資金調達...',
          thumbImg:
            'https://techcrunchjp.files.wordpress.com/2020/03/quibi.jpg',
          pv: 500,
          author: 'TechCrunch Japan',
          originUrl: 'https://www.google.com/',
          goodCount: 1,
          badCount: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          categoryId: 2,
          title: '実物大ガンダムを初公開、人間が操作',
          content:
            '人気アニメ「機動戦士ガンダム」のテレビ放映40周年を記念して動く「実物大」ガンダムの製作が進んでいる。3日、試験施設がある茨城県取手市で、フレームを稼働させるテストが報道陣らに公開された。',
          thumbImg:
            'https://www.asahicom.jp/articles/images/AS20200305005036_comm.jpg',
          pv: 29,
          author: '朝日新聞デジタル - 社会',
          originUrl: 'https://www.google.com/',
          goodCount: 2,
          badCount: 2,
          createdAt: now,
          updatedAt: now,
        },
        {
          categoryId: 1,
          title: 'テストニュース3',
          content: 'テストニュース3詳細',
          thumbImg:
            'https://techcrunchjp.files.wordpress.com/2020/03/quibi.jpg',
          pv: 3,
          author: 'テスト3ニュース編集部',
          originUrl: 'https://www.google.com/',
          goodCount: 3,
          badCount: 3,
          createdAt: now,
          updatedAt: now,
        },
        {
          categoryId: 2,
          title: 'テストニュース4',
          content: 'テストニュース4詳細',
          thumbImg:
            'https://techcrunchjp.files.wordpress.com/2020/03/quibi.jpg',
          pv: 10,
          author: 'テスト4ニュース編集部',
          originUrl: 'https://www.google.com/',
          goodCount: 4,
          badCount: 4,
          createdAt: now,
          updatedAt: now,
        },
        {
          categoryId: 1,
          title: 'テストニュース5',
          content: 'テストニュース5詳細',
          thumbImg:
            'https://techcrunchjp.files.wordpress.com/2020/03/quibi.jpg',
          pv: 80,
          author: 'テスト5ニュース編集部',
          originUrl: 'https://www.google.com/',
          goodCount: 5,
          badCount: 5,
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
    return queryInterface.bulkDelete('Posts', null, {})
  },
}
