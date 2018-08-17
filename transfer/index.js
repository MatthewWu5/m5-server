var path = require('path')
var fs = require('fs')
var { downloadFolder } = require('../config')

module.exports = function addRouter(router) {
  router.get('/list', function(req, res) {
    if (fs.existsSync(downloadFolder)) {
      var dirList = fs.readdirSync(downloadFolder)
      var returnHtml = ''
      dirList.forEach(function(fileName) {
        returnHtml += `<div><a target="#blank" href="${'/d/' +
          fileName}">${fileName}</a></div>`
      })
      res.send(returnHtml)
    } else {
      res.send('download folder does not exist')
    }
  })

  router.get('/d/*', function(req, res) {
    var file = downloadFolder + decodeURI(req.url).replace('/d', '')
    if (fs.existsSync(file)) {
      var fileName = path.basename(file)
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName)
      res.setHeader('Cache-Control', 'max-age=30')
      var fileStream = fs.createReadStream(file)
      fileStream.pipe(res)
    } else {
      res.send('file not exist')
    }
  })

  router.get('/upload', function(req, res) {
    res.sendFile(__dirname + '/upload.html')
  })
}
