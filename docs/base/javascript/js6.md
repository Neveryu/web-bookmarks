# 优秀的 JavaScript API



用来记录一些新的常用的有用的 js api，比如 performance、sendBeacon 这之类的。


## js API navigator.sendBeacon
`navigator.sendBeacon` 方法可用于通过 HTTP 将少量数据异步传输到 Web 服务器。
[文档在这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
在这个文档里，还能看到关于页面 unload 的时候，进行统计，尝试向服务器发送数据，的两种理论可行方案，值得学习。


【requestAnimationFrame】
与setTimeout和setInterval不同，requestAnimationFrame不需要设置时间间隔。这有什么好处呢？为什么requestAnimationFrame被称为神器呢？本文将详细介绍HTML5新增的定时器requestAnimationFrame。
[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)