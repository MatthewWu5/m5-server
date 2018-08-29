var app = require('express')()
var router = require('express').Router()
var http = require('http').Server(app)

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
app.use(router)
