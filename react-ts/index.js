var path = require('path')
var fs = require('fs')
var users = require('./users')

module.exports = function addRouter(router) {
  router.get('/react-ts/test', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.sendFile(__dirname + '/package.json')
  })
  router.get('/react-ts/preLogin', function(req, res) {
    res.send({isLogon: isUserLogin(req)})
  })
  router.post('/react-ts/login', function(req, res) {
    if(users.isUserExist(req.params.username, req.params.password)){
      const token = users.getToken(req.params.username, req.params.password)
      this.addUserSession(req, token)
      res.send({login: 'success'})
    }else{
      res.send({login: 'error'})
    }
  })
  router.post('/react-ts/login2', function(req, res) {
      res.send({username: req.query.username, password: req.query.password})
  })
  router.get('/react-ts/contacts', function(req, res) {
    const All_CONTACTS = [
      {
        id: '1',
        name: {
          first: 'John',
          last: 'Doe',
        },
        phone: '555',
        email: 'john@gmail.com',
      },
      {
        id: '2',
        name: {
          first: 'Bruce',
          last: 'Wayne',
        },
        phone: '777',
        email: 'bruce.wayne@gmail.com',
      },
      {
        id: '3',
        name: {
          first: 'Bruce',
          last: 'Wayne',
        },
        phone: '777',
        email: 'bruce.wayne@gmail.com',
      },
    ]
    let result = All_CONTACTS
    if(req.query && req.query.phone && req.query.phone != 'undefined'){
      result = result.filter(x=>x.id != '1')
    }
    res.send(result)
  })
}

function addUserSession(req, token) {
  req.session.userSession[req.params.username] = token
}

function isUserLogin(req){
  return req.session.cookie.user_session && req.session.userSession.find(x=>req.session.userSession[x] == req.session.cookie.user_session)
}
