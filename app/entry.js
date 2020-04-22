'use strict'
// jquery
import $ from 'jquery'
import 'slick-carousel'

// css
import '../public/stylesheets/remedy.css'
import '../public/stylesheets/slick.css'
// scss
import '../public/stylesheets/common.scss'
import '../public/stylesheets/list.scss'
import '../public/stylesheets/detail.scss'

/**
 * 一覧の人気記事のスライダー
 */
$('.popular-slider').slick({
  dots: false,
  arrows: false,
  autoplay: false,
  centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    // 480〜599px
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    // 〜479px
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})

/**
 * 文字列をUnicodeに変換するメソッド
 */
String.prototype.toUnicode = function () {
  let result = []
  for (let char = 0; char < this.length; char++) {
    result.push(
      '\\u' + ('000' + this[char].charCodeAt(0).toString(16)).substr(-4)
    )
  }
  return result
}
/**
 * 本文をunicodeに変換して文字化けをしていないか判定
 */
// 文字化けしている文字コード
let replacementCharacter = '\\ufffd'
$('.media__description, .article__main__content').each((i, e) => {
  // 一覧の各記事の詳細文、詳細の本文を取得し文字化けしていないか判定
  let articleText = $(e)
  // unicodeに変換
  let unicodeText = articleText.text().toUnicode()
  for (let char = 0; char <= 5; char++) {
    // 5文字まで文字化けしてないか判定
    if (unicodeText[char] === replacementCharacter) {
      // 文字化けしていたらテキスト空にする
      articleText.text('')
    }
  }
})

/**
 * Goodボタン
 */
$('.comment-score__btn--good').each((i, e) => {
  const button = $(e)
  button.click(() => {
    // 記事ID
    const postId = button.data('post-id')
    // コメントID
    const commentId = button.data('comment-id')
    // good・badのカウント
    const count = button.data('comment-count')
    $.post(
      `/post/${postId}/comment/${commentId}/good`,
      { goodCount: count },
      (data) => {
        button.data('comment-count', data.goodCount)
        button.next().text(data.goodCount)
        button.prop('disabled', true)
        button.find('i').removeClass('far').addClass('fas')
      }
    )
  })
})

/**
 * Badボタン
 */
$('.comment-score__btn--bad').each((i, e) => {
  const button = $(e)
  button.click(() => {
    // 記事ID
    const postId = button.data('post-id')
    // コメントID
    const commentId = button.data('comment-id')
    // good・badのカウント
    const count = button.data('comment-count')
    $.post(
      `/post/${postId}/comment/${commentId}/bad`,
      { badCount: count },
      (data) => {
        button.data('comment-count', data.badCount)
        button.next().text(data.badCount)
        button.prop('disabled', true)
        button.find('i').removeClass('far').addClass('fas')
      }
    )
  })
})

/**
 * グローバルナビの現在リンク判定
 */
// URLから現在の絞り込み
let currentURL = location.pathname
if (currentURL.match(/category/)) {
  let category = currentURL.split('/category/')[1].replace(/\//, '')

  // カテゴリー絞り込み かつ 該当リンク だったらグローバルナビにクラス付与
  $('.nav-item').each(function () {
    let thisPath = $(this).find('a').attr('href').split('category')[1]
    // general, entertainment....
    let thisCategory = thisPath.split('/')[1]
    if (category === thisCategory) {
      $(this).find('a').addClass('nav-item__link--active')
      $(this).prependTo('.nav-list')
    }
  })
}

/**
 * 詳細ページの日付の0埋め
 */
if ($('.article__head__info .info__date').length > 0) {
  // 詳細の日付取得
  let dateText = $('.article__head__info .info__date').text()
  // 年 - 月 - 日
  let dateArr = dateText.split('-')
  // 月の0埋め
  let dateMonth = zeroPadding(dateArr[1], 2)
  // 日の0埋め
  let dateDay = zeroPadding(dateArr[2], 2)
  // テキストの書き換え
  $('.article__head__info .info__date').text(
    dateArr[0] + '-' + dateMonth + '-' + dateDay
  )
}

/**
 * 数値の0埋め
 * @param {int} num 0埋め対象の数字
 * @param {int} len 揃える桁数
 */
function zeroPadding(num, len) {
  return (Array(len).join('0') + num).slice(-len)
}
