var app = require('express')()
var http = require('http').Server(app)
var port = process.env.PORT || 80

http.listen(port, function () {
  console.log('listening on *:' + port)
})

var router = require('./for-news/router')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)