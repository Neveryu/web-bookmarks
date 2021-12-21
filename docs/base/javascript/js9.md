# 优秀的 JavaScript API


## Window.performance
Web Performance API允许网页访问某些函数来测量网页和Web应用程序的性能，包括 Navigation Timing API和高分辨率时间数据。


## navigator.sendBeacon
`navigator.sendBeacon` 方法可用于通过 HTTP 将少量数据异步传输到 Web 服务器。
[docs/Web/API/Navigator/sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
在这个文档里，还能看到关于页面 unload 的时候，进行统计，尝试向服务器发送数据，的两种理论可行方案，值得学习。


## requestAnimationFrame
与 `setTimeout` 和 `setInterval` 不同，`requestAnimationFrame` 不需要设置时间间隔。这有什么好处呢？为什么 `requestAnimationFrame` 被称为神器呢？本文将详细介绍HTML5新增的定时器 `requestAnimationFrame`。

requestAnimationFrame：不同的threejs应用场景，执行一帧的时间是不确定的，threejs动画程序一般选择requestAnimationFrame方法，而不是选择setInterval方法设置固定的刷新频率，也就是周期性执行时间。

[docs/Web/API/Window/requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)


## IntersectionObserver
**交叉观察器**。  IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。**常用来判断某个元素是否进入了"视口"（viewport）**。

[Intersection Observer - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)、
[阮一峰 - IntersectionObserver API 使用教程](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

## ResizeObserver
`ResizeObserver` 接口可以监听到 `Element` 的内容区域或 `SVGElement` 的边界框改变。 内容区域则需要减去内边距 `padding`。（有关内容区域、内边距资料见盒子模型 ）

`ResizeObserver` 避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理 DOM 中更深层次的元素来实现这一点。 如果（浏览器）遵循规范，只会在绘制前或布局后触发调用。

``` js
// 示例一
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    entry.target.style.borderRadius = Math.max(0, 250 - entry.contentRect.width) + 'px';
  }
});
resizeObserver.observe(document.querySelector('.box:nth-child(2)'));
```

``` js
// 示例二
var ro = new ResizeObserver( entries => {
    for (let entry of entries) {
      this.onWindowResizeAuto()  // 大小变化后，执行的方法
    }
});
ro.observe(mapContainer);  // mapContainer：被观察的DOM节点
```

