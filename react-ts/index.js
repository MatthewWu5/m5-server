var path = require('path')
var fs = require('fs')

module.exports = function addRouter(router) {
  router.get('/react-ts/test', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + '/package.json')
  })
  router.get('/react-ts/preLogin', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send({token: 'jlfewiwoldfsfd', isLogon: false})
  })
  router.get('/react-ts/login', function(req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*')
    console.log(req.session)
    res.send({login: 200})
  })
}
