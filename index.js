var app = require('express')()
var router = require('express').Router()
var http = require('http').Server(app)
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var cookieParser = require('cookie-parser')

var addNewsRouter = require('./news')
var addTransferRouter = require('./transfer')
var addTestRouter = require('./react-ts')

var port = process.env.PORT || 8081

http.listen(port, function() {
  console.log('listening on: http://localhost:' + port)
})

addNewsRouter(router)
addTransferRouter(router)
addTestRouter(router)

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(
  session({
    secret: 'm5-serve-secret-key', // 用来对session id相关的cookie进行签名
    //store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
      maxAge: 60 * 1000 // 有效期，单位是毫秒
    }
  })
)

app.use(router)
