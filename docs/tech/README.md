# 前端发送请求 ajax

web前端发请求的几种常见方式

### XMLHttpRequest
[如何优雅的使用 xhr](../base/javascript/js3.html)

### jquery
[jquery - ajax](https://blog.csdn.net/csdn_yudong/article/details/52683018)

### axios
基于 promise
[npm英文文档](https://www.npmjs.com/package/axios) [中文文档](https://www.kancloud.cn/yunye/axios/234845)

axios 是基于 promise 设计，旧浏览器不支持 promise，需要使用 polyfill。[es6-promise](https://blog.csdn.net/csdn_yudong/article/details/82256703)

### fetch
fetch 并不是一个第三方库，它是 W3C 的正式标准。fetch 挂载在 BOM 中，可以直接在谷歌浏览器中使用。[MDN - Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

[浏览器兼容情况](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9)
[浏览器支持情况](https://caniuse.com/#search=fetch)

fetch API 是基于 promise 设计，旧浏览器不支持 promise，需要使用 polyfill。[es6-promise](https://blog.csdn.net/csdn_yudong/article/details/82256703)

### fly
一个支持所有 JavaScript 运行环境的基于 Promise 的、支持请求转发、强大的 http 请求库。可以让您在多个端上尽可能大限度的实现代码复用。

目前 Fly.js 支持的平台包括：Node.js 、微信小程序 、Weex 、React Native 、Quick App 和浏览器，这些平台的 JavaScript 运行时都是不同的。更多的平台正在持续添加中，请保持关注。

[中文文档](https://wendux.github.io/dist/#/doc/flyio/readme)

Node 下 Fly 的功能要明显强于 axios，Fly 在 node 下不仅提供了文件下载、上传的 API，而且还可以通过 fly.$http 直接调用 [request 库](https://github.com/request/request) 的所有功能，详情请参照 [Node 下增强的 API](https://wendux.github.io/dist/#/doc/flyio/node) 。