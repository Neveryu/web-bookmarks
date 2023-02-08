# Service Worker

在这个网站：[https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-introduction](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-introduction)的 Service Worker 简介中，下面这一段真的写的挺好的。

:::tip
【前端工程师有很多性能优化的手段，包括 CDN、CSS Sprite、文件的合并压缩、异步加载、资源缓存等等。其实我们绝大部分情况是在干一件事情，那就是尽量降低一个页面的网络请求成本从而缩短页面加载资源的时间并降低用户可感知的延时。当然减少用户可感知的延时也不仅仅是在网络请求成本层面，还有浏览器渲染效率，代码质量等等。】
:::

关于 register 方法的 scope 参数，需要说明一下：Service Worker 线程将接收 scope 指定网域目录上所有事项的 fetch 事件。
（接受scope上所有事项的fetch事件？不错哦，可以验证一下）

所以在 Service Worker 的 js 逻辑中全局变量需要慎用。


如果你很困惑，我的 Service Worker 到底注册成功没有呢？注册成功是什么样子呢？
可以在 PC 上打开我们的好伙伴 chrome 浏览器, 输入 chrome://inspect/#service-workers

我们还可以通过 chrome://serviceworker-internals 来查看服务工作线程详情。 如果只是想了解服务工作线程的生命周期，这仍很有用，但是日后其很有可能被 chrome://inspect/#service-workers 完全取代。