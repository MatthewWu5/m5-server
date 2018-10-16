// var path = require('path')
var fs = require('fs')
var https = require('https')
var iconv = require('iconv-lite')

const url =
  'https://d.weibo.com/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=102803&pagebar=1&tab=home&current_page=2&pre_page=1&page=1&pl_name=Pl_Core_NewMixFeed__3&id=102803&script_uri=/102803&feed_type=1&domain_op=102803&__rnd=1536469881685'

const _path =
  '/p/aj/v6/mblog/mbloglist?ajwvr=6&domain=102803&pagebar=1&tab=home&current_page=2&pre_page=1&page=1&pl_name=Pl_Core_NewMixFeed__3&id=102803&script_uri=/102803&feed_type=1&domain_op=102803&__rnd=1536469881685'

const getRequestData = function(path) {
  return new Promise(function(resolve, reject) {
    var options = {
      host: 'd.weibo.com',
      path: path,
      method: 'GET',
      protocol: 'https:',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Cookie:
          'SINAGLOBAL=2278513776238.8906.1528525095518; _s_tentry=-; TC-Page-G0=444eec11edc8886c2f0ba91990c33cda; Apache=8246950087393.196.1535526128929; ULV=1535526128936:5:1:1:8246950087393.196.1535526128929:1531148930461; login_sid_t=94538f6471e6896d68a0deb851f1cf88; cross_origin_proto=SSL; YF-Page-G0=46f5b98560a83dd9bfdd28c040a3673e; un=matthew1157@163.com; wb_view_log_3007471801=1440*9002; UOR=finance.ifeng.com,widget.weibo.com,login.sina.com.cn; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WFA9ocAHmQnGa6WSi7uE1iX5JpX5K2hUgL.Foe7ehMXS02Reh22dJLoI7LSqPxXIsHNP0-t; ALF=1567999273; SSOLoginState=1536463274; SCF=AsJtZUsNkepBZ9m4IxtRffdWf3AoYo3OLSSB1Nv5VV8qQU_HILaYtMvDV6Ip8DpyXmHbR6lhbbfIeAeQ1dP-WBg.; SUB=_2A252kOH7DeRhGeVO61UV9y_Eyz2IHXVV5FQzrDV8PUNbmtBeLXfYkW9NTVMluZqMRzZPShgq128J1ziayi47Ofdn; SUHB=0D-Fwd5OaDYvgG; wvr=6',
        Host: 'd.weibo.com',
        Pragma: 'no-cache',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
      }
    }
    var req = https.request(options, function(resp) {
      var buffers = []
      resp.on('data', function(chunk) {
        buffers.push(chunk)
      })
      resp.on('end', function(chunk) {
        var wholeData = Buffer.concat(buffers)
        // var data = iconv.decode(wholeData, 'base64')
        var data0 = wholeData.toString()
        // var data = decode(wholeData, 'ASCII')
        // var data2 = decode(wholeData, 'UTF-16LE')
        // var data3 = decode(wholeData, 'UCS-2')
        // var data4 = decode(wholeData, 'Binary')
        // var data5 = decode(wholeData, 'Hex')
        resolve({ data0 })
      })
    })
    req.end()
  })
}

const decode = function(data, type) {
  try {
    var result = iconv.decode(data, type)
  } catch (err) {
    console.error(type, err)
  }
  return result
}

module.exports = function addRouter(router) {
  router.get('/test', function(req, res) {
    res.send(200)
  })

  router.get('/weibo2', function(req, res) {
    getRequestData(_path).then(resData => {
      res.send(resData)
    })
  })

  router.get('/weibo', function(req, res) {
    getRequestData('/102803').then(resData => {
      res.setHeader('Vary', 'Accept-Encoding')
      res.setHeader('Transfer-Encoding', 'chunked')
      // res.setHeader('Content-Encoding', 'gzip')
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.send(resData)
    })
  })
}
