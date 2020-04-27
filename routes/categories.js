'use strict'
const express = require('express')
const router = express.Router()
var NewsAPI = require('newsapi')
const db = require('../models/index')
const Categories = db.Categories
const Posts = db.Posts

router.get('/', (req, res, next) => {
  console.log('category')
  // トップリダイレクト
  res.redirect('../')
})

// カテゴリ名でニュース取得
router.get('/:categorySlug', (req, res, next) => {
  console.log(req.params.categorySlug)
  // URL内のcategory名取得
  const categorySlug = req.params.categorySlug
  if (!categorySlug.match(/^[A-Za-z0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }

  let storedCategory = null
  let populatePosts = null
  Categories.findOne({
    where: {
      slug: categorySlug,
    },
  })
    .then((category) => {
      storedCategory = category
      // PV数から人気の記事取得
      return Posts.findAll({
        where: {
          categoryId: category.id,
        },
        limit: 3,
        order: [['pv', 'DESC']],
      })
    })
    .then((posts) => {
      populatePosts = posts
      return Posts.findAll({
        where: {
          categoryId: storedCategory.id,
        },
        limit: 3,
        order: [['updatedAt', 'DESC']],
      })
    })
    .then((posts) => {
      res.render('index', {
        title: storedCategory.name + 'に関するニュース｜JAPAN-TODAY-NEWS',
        description:
          'ニュースまとめサイト「JAPAN-TODAY-NEWS」。' +
          storedCategory.name +
          'に関する最新のニュースです。',
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl,
        ogType: 'article',
        ogImageUrl: req.protocol + '://' + req.headers.host + '/ogp.png',
        populatePosts: populatePosts,
        posts: posts,
      })
    })
    .catch((error) => {
      console.log('ERROR処理')
      console.error(error)
    })
  // Posts.findAll({
  //   where: {
  //     categoryId:
  //   }
  // }).then(posts => {
  //   console.log(posts)
  //   res.render('index', {
  //     title: 'ニュース一覧',
  //     posts
  //   })
  // })

  // const NEWS_API_KEY = process.env.NEWS_API_KEY
  // const newsapi = new NewsAPI(NEWS_API_KEY)
  // let newsArr = []
  // newsapi.v2
  //   .topHeadlines({
  //     category: categoryName,
  //     country: 'jp',
  //     pageSize: '3'
  //   })
  //   .then(news => {
  //     news['articles'].forEach(item => {
  //       // ニュースごとの処理
  //       console.log(item.title)
  //     })
  //   })
})

module.exports = router
