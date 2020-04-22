const express = require('express')
const router = express.Router()
const db = require('../models/index')
const Posts = db.Posts

router.get('/', function (req, res, next) {
  /**
   * Generalの人気記事
   */
  let populatePosts = null
  Posts.findAll({
    limit: 3,
    order: [['pv', 'DESC']],
  })
    .then((posts) => {
      populatePosts = posts
      return Posts.findAll({
        limit: 5,
        order: [['updatedAt', 'DESC']],
      })
    })
    .then((posts) => {
      res.render('index', {
        title: 'ニュース一覧｜国内最新ニュース',
        description: '最新ニュース一覧です',
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl,
        ogType: 'website',
        ogImageUrl: req.protocol + '://' + req.headers.host + '/ogp.png',
        populatePosts: populatePosts,
        posts: posts,
      })
    })
    .catch((error) => {
      console.log('ERROR処理')
      console.error(error)
    })

  // Postsテーブル内の記事をすべて取得し描画
  // Posts.findAll().then(posts => {
  //   res.render('index', {
  //     title: 'ニュース一覧',
  //     description: '最新ニュース一覧です',
  //     style: 'list',
  //     posts
  //   })
  // })
})

module.exports = router
