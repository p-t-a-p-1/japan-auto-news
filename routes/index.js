const express = require('express')
const router = express.Router()
const db = require('../models/index')
const Posts = db.Posts

// トップページアクセス
router.get('/', function (req, res, next) {
  /**
   * 全記事からPV数が多い記事上位3件取得
   */
  let populatePosts = null
  Posts.findAll({
    limit: 3,
    order: [['pv', 'DESC']],
  })
    .then((posts) => {
      // 人気記事情報を格納
      populatePosts = posts

      /**
       * 全記事から新着5件取得
       */
      return Posts.findAll({
        limit: 5,
        order: [['updatedAt', 'DESC']],
      })
    })
    .then((posts) => {
      /**
       * 取得した人気記事情報、新着記事情報をindex.pugに渡す
       */
      res.render('index', {
        title: 'ニュース一覧｜国内最新ニュース', // ページtitle
        description:
          'ニュースまとめサイト「JAPAN-TODAY-NEWS」。一般、エンタメ、健康、スポーツに関する最新のニュースを1日1回追加します。', // ページdescription
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl, // 現在のURL
        ogType: 'website', // ogの定義で使用
        ogImageUrl: req.protocol + '://' + req.headers.host + '/ogp.png', // og画像
        populatePosts: populatePosts, // 人気記事情報
        posts: posts, // 新着記事情報
      })
    })
    .catch((error) => {
      console.log('ERROR処理')
      console.error(error)
    })
})

module.exports = router
