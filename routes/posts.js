'use strict'
const express = require('express')
const router = express.Router()
const moment = require('moment')
const os = require('os')
const db = require('../models/index')
const Posts = db.Posts
const Comments = db.Comments
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

      return Comments.findAll({
        where: {
          postId: post.id,
        },
      })
    })
    .then((comments) => {
      // 記事情報・コメントからpost.pugにデータ渡してページ描画
      res.render('post', {
        title: storedPost.title + '｜国内最新ニュース',
        description: storedPost.content.slice(0, 90),
        currentUrl: req.protocol + '://' + req.headers.host + req.originalUrl,
        ogType: 'article',
        ogImageUrl: storedPost.thumbImg,
        post: storedPost,
        comments: comments,
        csrfToken: req.csrfToken(),
      })
    })
    .catch((error) => {
      console.log('ERROR処理')
      console.error(error)
    })
})

// コメントをDBに追加
router.post('/comment/:postId', csrfProtection, (req, res, next) => {
  let addPostId = req.params.postId

  // TODO リクエストのホスト名が一致していないとコメント挿入できないようにする
  // if (req.url === ) {
  // }

  if (!addPostId.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('/')
  }

  // コメント送信元のIPアドレス取得
  const clientIP = getClientIP(req)
  let createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
  Comments.create({
    postId: addPostId,
    message: req.body.message,
    hostname: os.hostname(),
    ip: clientIP,
    goodCount: 0,
    badCount: 0,
    createdAt: createdAt,
  }).catch((error) => {
    console.log('ERROR処理')
    console.error(error)
  })
  res.redirect('/post/' + addPostId)
})

// goodボタンクリックでapi叩いてカウント増やす
router.post('/:postId/comment/:commentId/good', (req, res, next) => {
  // 投稿ID
  const postId = req.params.postId
  // コメントID(primary key)
  const commentId = req.params.commentId
  // カウント + 1 で次のカウント
  let goodCount = req.body.goodCount
  const nextCount = goodCount + 1
  if (!goodCount.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }
  goodCount = parseInt(goodCount)

  Comments.findOne({
    where: {
      id: commentId,
    },
  }).then((comment) => {
    if (comment.goodCount === goodCount) {
      /**
       * DBにあるいいねカウントの数とAPIで叩かれたクエリのいいねカウントが
       * 同じのみDBのカウント増やす
       */
      goodCount = goodCount + 1
      Comments.update(
        {
          goodCount: goodCount,
        },
        {
          where: {
            id: comment.id,
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
router.post('/:postId/comment/:commentId/bad', (req, res, next) => {
  // 投稿ID
  const postId = req.params.postId
  // コメントID(primary key)
  const commentId = req.params.commentId
  // カウント + 1 で次のカウント
  let badCount = req.body.badCount
  const nextCount = badCount + 1
  if (!badCount.match(/^[0-9]+$/)) {
    // TODO 404ページを作ってそっちに飛ばす
    res.redirect('../')
  }
  badCount = parseInt(badCount)

  Comments.findOne({
    where: {
      id: commentId,
    },
  }).then((comment) => {
    if (comment.badCount === badCount) {
      /**
       * DBにあるいいねカウントの数とAPIで叩かれたクエリのいいねカウントが
       * 同じのみDBのカウント増やす
       */
      badCount = badCount + 1
      Comments.update(
        {
          badCount: badCount,
        },
        {
          where: {
            id: comment.id,
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
/**
 * クライアントのIPアドレス取得
 * @param {object} request クライアントのリクエスト
 */
function getClientIP(request) {
  if (request.headers['x-forwarded-for']) {
    return request.headers['x-forwarded-for']
  }

  if (request.connection && request.connection.remoteAddress) {
    return request.connection.remoteAddress
  }

  if (request.connection.socket && request.connection.socket.remoteAddress) {
    return request.connection.socket.remoteAddress
  }

  if (request.socket && request.socket.remoteAddress) {
    return request.socket.remoteAddress
  }
  return '0.0.0.0'
}

module.exports = router
