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
  router.post('/react-ts/contacts', function(req, res){
    const contacts = [
      {
        id: '8080',
        name: {
          first: 'John',
          last: 'Doe'
        },
        phone: req.params.phoneNumber,
        email: 'john@gmail.com'
      },
      {
        id: '8081',
        name: {
          first: 'Bruce',
          last: 'Wayne'
        },
        phone: req.params.phoneNumber,
        email: 'bruce.wayne@gmail.com'
      },
    ]
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send({ items: contacts })
  })
}
