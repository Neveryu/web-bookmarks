# chrome调试与开发技巧

## 调试技巧（F12）
1.当你选择一个节点时，此时`Console`中的`$0`就代表这个DOM节点。
2.调试一个节点的hover或者active等等之类的样式时，可以在当前节点上右键选择Force state
3.DOM断点：在调试器中找到一个dom节点，右键选择break on，选择其中一个你想要打断点的模式，当出发到这个模式时，即可断点定位到将要执行的代码。
4.debug函数
```
function test() { ... }
debug(test)
```
当test函数被执行时，即可断点
5.console.log('%cwerwerwr%c  ', '', '')，%c占位符，可以对应的写css样式，将会影响后面的内容。


## 禁用Firefox和Chrome的安全性检测
如果你使用的是chrome浏览器，有种方式可以禁用安全性设置，这样就可以在没有web服务器的情况下查看示例。需要注意的是，应尽量避免用下面的方法访问真正的网站，因为这样做会使浏览器向各种恶意代码敞开大门。用下面的命令可以启动chrome浏览器同时禁用所有安全特性。

对于windows操作系统：
```
chrome.exe --disable-web-security
```

对于 Mac OS 操作系统：
```
open -a "Google Chrome" --args --disable-web-security
```

