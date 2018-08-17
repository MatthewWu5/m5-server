let core = require('./core')
let url = require('./url')

module.exports = function addRouter(router) {
  //dynamic loading router
  for (let prop in url.post) {
    if (url.post.hasOwnProperty(prop)) {
      router.post(url.post[prop], addCatch)
    }
    function addCatch(req, res) {
      try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        core[prop](req, res)
      } catch (ex) {
        console.log(req.url, ex)
      }
    }
  }
  for (let prop in url.get) {
    if (url.get.hasOwnProperty(prop)) {
      router.get(url.get[prop], addCatch)
    }
    function addCatch(req, res) {
      try {
        res.setHeader('Access-Control-Allow-Origin', '*')
        core[prop](req, res)
      } catch (ex) {
        console.log(req.url, ex)
      }
    }
  }
}
