# 开发环境搭建与代理

## 纯静态页面在服务器环境预览
搭建一个小型服务器，在 server 环境来预览我们的项目。
http-server、anywhere 都可以。【推荐使用 http-server】
``` bash
npm i http-server -g
```
然后
``` bash
cd yourproject
http-server
```

## 搭建开发环境&配置接口代理

搭建一个前端的开发环境（server + 代理）【express + http-proxy-middleware】

``` js
var express = require('express')
var proxyMiddleware = require('http-proxy-middleware')

var app = express()

// 配置代理
var base_url = 'https://www.easy-mock.com/mock/5b8fb17106b4621da8247b26'
var proxyTable = {
  '/': {
    target: base_url,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/': ''
    }
  }
}

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 前端代码src目录位置配置
app.use(express.static('src'))

// 自定义接口
var captchaCode = {
  code: 131002
}
app.post('/point/v1/business/getcaptcha', function(req, res) {
  setTimeout(function() {
   res.status(200);
   res.json(captchaCode);
  }, 3000)
})

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
```


【webpack-dev-server】