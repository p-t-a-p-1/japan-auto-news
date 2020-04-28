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

// カテゴリ指定のURLでgetされた場合はカテゴリに関するニュース取得
router.get('/:categorySlug', (req, res, next) => {
  // URL内のcategory名取得
  const categorySlug = req.params.categorySlug
  if (!categorySlug.match(/^[A-Za-z0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }

  let storedCategory = null
  let populatePosts = null

  // リクエストできたURLパラメータからカテゴリ情報を取得
  Categories.findOne({
    where: {
      slug: categorySlug,
    },
  })
    .then((category) => {
      /**
       * カテゴリ情報取得後、そのカテゴリに関する記事をPostsテーブルから取得する
       */
      storedCategory = category

      // PV数から人気の記事3件取得
      return Posts.findAll({
        where: {
          categoryId: category.id, // カテゴリのId
        },
        limit: 3, // 記事数
        order: [['pv', 'DESC']], // PV数が多い順から
      })
    })
    .then((posts) => {
      // 人気記事情報を格納
      populatePosts = posts

      // 新着記事5件取得
      return Posts.findAll({
        where: {
          categoryId: storedCategory.id, // カテゴリのId
        },
        limit: 5, // 記事数
        order: [['updatedAt', 'DESC']], // 日付の降順
      })
    })
    .then((posts) => {
      /**
       * 記事取得後、index.pugにデータ渡す
       */
      res.render('index', {
        title: storedCategory.name + 'に関するニュース｜JAPAN-TODAY-NEWS', // ページtitle
        description:
          'ニュースまとめサイト「JAPAN-TODAY-NEWS」。' +
          storedCategory.name +
          'に関する最新のニュースです。', // ページdescription
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl, // 現在のURL
        ogType: 'article', // og定義で使用
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
