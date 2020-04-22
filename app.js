let createError = require('http-errors')
let express = require('express')
let favicon = require('serve-favicon')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let sassMiddleware = require('node-sass-middleware')
let helmet = require('helmet')
let NewsAPI = require('newsapi')

let indexRouter = require('./routes/index')
let categoriesRouter = require('./routes/categories')
let postsRouter = require('./routes/posts')

let app = express()
app.use(helmet())
app.use(logger('short'))

// favicon
app.use(
  favicon(__dirname + '/public/images/favicon.ico', {
    maxAge: 2592000000, // キャッシュの有効期限
  })
)

// sass有効化
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // scss利用時はfalse
    sourceMap: true,
  })
)
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/category', categoriesRouter)
app.use('/post', postsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
