# Node.js 基础

> Node.js 基础；快速、阅览、回顾。全文速览约 7 分钟；打开音乐，让我们开始吧~

### Hello World

``` js
var http = require('http');

http.createServer(function (request, response) {
    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

### REPL：交互式解释器

下划线(`_`)变量： 你可以使用下划线(`_`)获取上一个表达式的运算结果：
``` bash
$ node
> var x = 10
undefined
> var y = 20
undefined
> x + y
30
> var sum = _
undefined
> console.log(sum)
30
undefined
>
```

### REPL 命令
- ctrl + c - 退出当前终端
- ctrl + c 按下两次 - 退出 Node REPL
- ctrl + d - 退出 Node REPL.
- 向上/向下 键 - 查看输入的历史命令
- tab 键 - 列出当前命令
- .help - 列出使用命令
- .break - 退出多行表达式
- .clear - 退出多行表达式
- .save filename - 保存当前的 Node REPL 会话到指定文件
- .load filename - 载入当前 Node REPL 会话的文件内容

### Node.js 回调函数
回调函数的一个直观作用和意义：

我们可以一边读取文件，一边执行其他命令，
在文件读取完成后，我们将文件内容作为回调函数的参数返回。
这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

### Node.js 事件循环
- Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。
- Node.js 几乎每一个 API 都是支持回调函数的。
- Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
- Node.js 单线程类似进入一个 `while(true)` 的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数。

### 事件驱动程序
Node.js 使用事件驱动模型，当 `web server` 接收到请求，就把它关闭然后进行处理，然后去服务下一个 `web` 请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为 `webserver` 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(`Subject`)，而所有注册到这个事件上的处理函数相当于观察者(`Observer`)。

Node.js 有多个内置的事件，我们可以通过引入 `events` 模块，并通过实例化 `EventEmitter` 类来绑定和监听事件，如下实例：

![](./assets/event_loop.jpg)

在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。

### Node.js EventEmitter
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件：
- 一个 `net.Server` 对象会在每次有新连接时触发一个事件。
- 一个 `fs.readStream` 对象会在文件被打开的时候触发一个事件。 

所有这些产生事件的对象都是 `events.EventEmitter` 的实例。
``` js
//event.js 文件
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000); 

// 1秒后输出： some_event 事件触发
```
`events` 模块只提供了一个对象： `events.EventEmitter`。 `EventEmitter` 的核心就是事件触发与事件监听器功能的封装。
> `EventEmitter` 对象如果在实例化时发生错误，会触发 `error` 事件。当添加新的监听器时，`newListener` 事件会触发，当监听器被移除时，`removeListener` 事件被触发。

`EventEmitter` 的每个事件由一个事件名和 **若干个** 参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，`EventEmitter` 支持 **若干个** 事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
``` js
var events = require('events'); 
var emitter = new events.EventEmitter(); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener1', arg1, arg2); 
}); 
emitter.on('someEvent', function(arg1, arg2) { 
    console.log('listener2', arg1, arg2); 
}); 
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

// 输出：
// listener1 arg1 参数 arg2 参数
// listener2 arg1 参数 arg2 参数
```

::: details EventEmitter 的属性/API
#### 方法：
`addListener(event, listener)`、`on(event, listener)`、`removeListener(event, listener)`、`removeAllListeners([event])`、`setMaxListeners(n)`、`listeners(event)`、`emit(event, [arg1], [arg2], [...])`。

#### 类方法：
``` js
listenerCount(emitter, event); // 返回指定事件的监听器数量。
events.EventEmitter.listenerCount(emitter, eventName) //已废弃，不推荐
events.emitter.listenerCount(eventName) //推荐
```

#### 事件：
`newListener`、`removeListener`。

::: tip
关于 `EventEmitter` 的 API 详细使用方法，请查阅文档。
:::
&nbsp;
::: danger 使用时注意
大多数时候我们不会直接使用 `EventEmitter`，而是在对象中继承它。包括 `fs`、`net`、`http` 在内的，只要是支持事件响应的核心模块都是 `EventEmitter` 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。
:::


### Node.js Buffer(缓冲区)
JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
::: tip
在 v6.0 之前创建Buffer对象直接使用 `new Buffer()` 构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在 v6.0 以后，官方文档里面建议使用 `Buffer.from()` 接口去创建 `Buffer` 对象。
:::
``` js
const buf = Buffer.from('runoob', 'ascii');
```

::: details 创建 Buffer 类
Buffer 提供了以下 API 来创建 Buffer 类：

- Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0。
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据。
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）。
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例。
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例。
:::

``` js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

#### 写入缓冲区
``` js
const buf = Buffer.from('runoob', 'ascii');
buf.write(string[, offset[, length]][, encoding]);
```
#### 从缓冲区读取数据
``` js
buf.toString([encoding[, start[, end]]])
```
#### 将 Buffer 转换为 JSON 对象
``` js
buf.toJSON()
```
::: tip JSON.parse 不常用的回调函数
``` js
// JSON.parse 回调函数的使用示例
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});
```
:::
#### 缓冲区合并
``` js
Buffer.concat(list[, totalLength]);  // 返回一个多个成员合并的新 Buffer 对象。
```
#### 缓冲区比较
``` js
buf.compare(otherBuffer);  // 返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
```
#### 拷贝缓冲区
``` js
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
```
#### 缓冲区裁剪
``` js
buf.slice([start[, end]])
```
#### 缓冲区长度
``` js
buf.length;  // 返回 Buffer 对象所占据的内存长度。
```

::: details Buffer更多方法/API参考手册
[可以参考的文档](https://www.runoob.com/nodejs/nodejs-buffer.html)
:::


### Node.js Stream(流)
`Stream` 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对 `http` 服务器发起请求的 `request` 对象就是一个 `Stream`，还有 `stdout`（标准输出）。

Node.js，Stream 有四种流类型：

- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。

所有的 `Stream` 对象都是 `EventEmitter` 的实例。常用的事件有：
- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。

#### 从流中读取数据
``` js
// 首先需要创建input.txt文件，里面写点东西
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end', function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

#### 写入流
``` js
var fs = require("fs");
var data = '目之所及，XXXX，心之所想，XXXX';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(data, 'UTF8');
// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});
writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

#### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
![](https://www.runoob.com/wp-content/uploads/2015/09/bVcla61)
``` js
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('a.txt');
// 创建一个可写流
var writerStream = fs.createWriteStream('text.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```

#### 链式流

链式是通过连接输出流到另外一个流并创建多个 **流操作链** 的机制。链式流一般用于管道操作。
> 说白了，就是链式操作。

::: details 用管道和链式来压缩和解压文件。
``` js
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");
```

``` js
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");
```
:::


### Node.js模块系统
为了让 Node.js 的文件可以相互调用，Node.js 提供了一个简单的模块系统。

模块是 Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是 JavaScript 代码、JSON 或者编译过的 C/C++ 扩展。

> 模块系统在平时工作学习中也用的很多，这里不多赘述了，有需要可以看文档。

由于 Node.js 中存在 4 类模块（原生模块和3种文件模块），尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同。如下图所示：

![](./assets/nodejs-require.jpg)

#### 从文件模块缓存中加载
尽管原生模块与文件模块的优先级不同，但是都会优先从文件模块的缓存中加载已经存在的模块。

#### 从原生模块加载
原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。以 http 模块为例，尽管在目录下存在 http、http.js、http.node、http.json 文件，`require("http")` 都不会从这些文件中加载，而是从原生模块中加载。

原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。

#### 从文件加载
当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前一节中已经介绍过，这里我们将详细描述查找文件模块的过程，其中，也有一些细节值得知晓。

require方法接受以下几种参数的传递：
- http、fs、path等，原生模块。
- ./mod 或 ../mod，相对路径的文件模块。
- /pathtomodule/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。

### Node.js 路由
所有数据都会包含在 request 对象中，但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。（两者选其一？这两个模块有什么异同点吗？）

> 路由只是对请求 request 对象做解析，然后，对于不同的请求 pathname 做不同的相应。

::: details 有网友用 event 来做路由的控制，是一个思路，可以帮助我们理解路由，但实际肯定不能这么用。
``` js
var http = require("http");
var url = require('url');
const { exit } = require("process");
var events = require('events');

// 创建 eventEmitter 对象 
var eventEmitter = new events.EventEmitter();

// route 根路径 
eventEmitter.on('/', function(method, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});
// route 404 
eventEmitter.on('404', function(method, url, response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found\n');
});

// 启动服务 
http.createServer(function (request, response) {
    console.log(request.url);
    // 分发 
    if (eventEmitter.listenerCount(request.url) > 0){
        eventEmitter.emit(request.url, request.method, response);
    }
    else {
        eventEmitter.emit('404', request.method, request.url, response);
    }
    
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
```
:::


### Node.js 全局对象
在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。


#### 全局对象与全局变量
global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。

当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。需要注 意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。

> 是不是说，使用 `global.abc = 'xxx'` 的方式才能定义全局变量？

::: danger
注意： 最好不要使用 var 定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。
:::

#### __filename
`__filename` 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
``` js
// 输出全局变量 __filename 的值
console.log( __filename );

// 打印： /nodejs/main.js
```

#### __dirname
`__dirname` 表示当前执行脚本所在的目录。

#### `setTimeout(cb, ms)`、`clearTimeout(t)`、`setInterval(cb, ms)`、`clearInterval(t)`、`console`

#### process
process 是一个全局变量，即 global 对象的属性。

它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
``` js
process.on('exit', function(code) {
  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");

// 程序执行结束
// 退出码为: 0
```

> 关于 `process` 的 方法/API，以及退出状态码的说明，请查阅文档。



::: details 笔记汇总来源
[https://www.runoob.com/nodejs](https://www.runoob.com/nodejs)
:::











