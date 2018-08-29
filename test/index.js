var path = require('path')
var fs = require('fs')

module.exports = function addRouter(router) {
  router.get('/test', function(req, res) {
    res.sendFile(__dirname + '/index.html')
  })
}
