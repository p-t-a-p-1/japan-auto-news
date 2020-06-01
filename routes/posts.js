'use strict'
const express = require('express')
const router = express.Router()
const moment = require('moment')
const os = require('os')
const db = require('../models/index')
const Posts = db.Posts
// const Comments = db.Comments
// CSRF対策
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

router.get('/', (req, res, next) => {
  // トップへリダイレクト
  res.redirect('../')
})

// 詳細ページ
router.get('/:postId', csrfProtection, (req, res, next) => {
  // 記事ID
  const postId = req.params.postId
  if (!postId.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }

  // 記事情報保存
  let storedPost = null
  Posts.findOne({
    where: {
      id: postId,
    },
  })
    .then((post) => {

      // 記事が見つからない場合は一覧リダイレクト
      if (post === null) {
        res.redirect('/')
      }
      // 記事IDから紐付くコメント取得
      post.createdAt = post.createdAt.toDateString()
      storedPost = post
      Posts.update(
        {
          pv: post.pv + 1,
        },
        {
          where: {
            id: post.id,
          },
        }
      ).catch((error) => {
        console.log('ERROR処理')
        console.error(error)
      })

      // 記事情報・コメントからpost.pugにデータ渡してページ描画
      res.render('post', {
        title: storedPost.title + '｜国内最新ニュース',
        description: storedPost.content.slice(0, 90),
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl,
        ogType: 'article',
        ogImageUrl: storedPost.thumbImg,
        post: storedPost,
        csrfToken: req.csrfToken(),
      })

    })
    .catch((error) => {
      console.log('ERROR処理')
      console.error(error)
    })
})

// goodボタンクリックでapi叩いてカウント増やす
router.post('/:postId/good', (req, res, next) => {
  // 投稿ID
  const postId = req.params.postId
  // カウント + 1 で次のカウント
  let goodCount = req.body.goodCount
  const nextCount = goodCount + 1
  if (!goodCount.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }
  goodCount = parseInt(goodCount)

  Posts.findOne({
    where: {
      id: postId,
    },
  }).then((post) => {
    if (post.goodCount === goodCount) {
      /**
       * DBにあるいいねカウントの数とAPIで叩かれたクエリのいいねカウントが
       * 同じのみDBのカウント増やす
       */
      goodCount = goodCount + 1
      Posts.update(
        {
          goodCount: goodCount,
        },
        {
          where: {
            id: post.id,
          },
        }
      )
        .then(() => {
          res.json({ status: 'OK', goodCount: goodCount })
        })
        .catch((error) => {
          console.log('ERROR処理')
          console.error(error)
        })
    }
  })
})

// badボタンクリックでapi叩いてカウント増やす
router.post('/:postId/bad', (req, res, next) => {
  // 投稿ID
  const postId = req.params.postId
  // カウント + 1 で次のカウント
  let badCount = req.body.badCount
  const nextCount = badCount + 1
  if (!badCount.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }
  badCount = parseInt(badCount)

  Posts.findOne({
    where: {
      id: postId,
    },
  }).then((post) => {
    if (post.badCount === badCount) {
      /**
       * DBにあるいいねカウントの数とAPIで叩かれたクエリのいいねカウントが
       * 同じのみDBのカウント増やす
       */
      badCount = badCount + 1
      Posts.update(
        {
          badCount: badCount,
        },
        {
          where: {
            id: post.id,
          },
        }
      )
        .then(() => {
          res.json({ status: 'OK', badCount: badCount })
        })
        .catch((error) => {
          console.log('ERROR処理')
          console.error(error)
        })
      console.log(badCount)
    }
  })
})

module.exports = router
