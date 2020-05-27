# 优秀的 JavaScript API


## Window.performance
Web Performance API允许网页访问某些函数来测量网页和Web应用程序的性能，包括 Navigation Timing API和高分辨率时间数据。


## navigator.sendBeacon
`navigator.sendBeacon` 方法可用于通过 HTTP 将少量数据异步传输到 Web 服务器。
[docs/Web/API/Navigator/sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
在这个文档里，还能看到关于页面 unload 的时候，进行统计，尝试向服务器发送数据，的两种理论可行方案，值得学习。


## requestAnimationFrame
与 `setTimeout` 和 `setInterval` 不同，`requestAnimationFrame` 不需要设置时间间隔。这有什么好处呢？为什么 `requestAnimationFrame` 被称为神器呢？本文将详细介绍HTML5新增的定时器 `requestAnimationFrame`。
[docs/Web/API/Window/requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)