# Promise 技巧

### new Promise写法的快捷方式
1、`Promise.resolve`
``` js
new Promise(resolve => {
  resolve(100)
})
// 等价于(可以认为是上述代码的语法糖)
Promise.resolve(100)

// 使用方法
Promise.resolve(100).then(value => {
  console.log(value)
})
```

另：`Promise.resolve` 方法另一个作用就是将`thenable`对象转换为`promise`对象。

ES6 Promises 提到了 `Thenable` 这个概念，简单来说，它就是一个非常类似`promise`的东西。就像我们有时称具有`.length`方法的非数组对象为类数组（Array like）一样，`thenable`指的是一个具有`.then`方法的对象。

2、`Promise.reject`
``` js
new Promise((resolve, reject) => {
  reject(new Error('出错了'))
})
// 等价于(就是上述代码的语法糖)
Promise.reject(new Error('出错了'))

// 使用方法
Promise.reject(new Error('出错了')).catch(error => {
  console.error(error)
})
```

### `Promise.all()`
`Promise.all`接收一个`promise`对象的数组作为参数，当这个数组里的所有`promise`对象全部变为`resolve`或`reject`状态的时候，它才会去调用`.then`方法。

也就是说：Promise的all方法提供了异步操作的能力，并且在所有异步操作执行完后才执行回调。
``` js
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
        resolve(delay);
    }, delay);
  });
}
var startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then(values => {
  console.log(Date.now() - startDate + 'ms');
  // 约128ms
  console.log(values);    // [1,32,64,128]
})
```
这说明`timerPromisefy`会每隔1、32、64、128ms都会有一个promise发生resolve行为，返回一个promise对象，状态为FulFilled，其状态值为传给 `timerPromisefy` 的参数，并且`all`会把所有异步操作的结果放进一个数组中传给`then`。

从上述结果可以看出，传递给`Promise.all`的promise并不是一个个的顺序执行的，而是同时开始、并行执行的。

### `Promise.race()`
`all`方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，这就是`race`方法，这个词本来就是赛跑的意思。`race`的用法与`all`一样，接收一个`promise`对象数组为参数。

`Promise.all`在接收到的所有的对象`promise`都变为`FulFilled`或者`Rejected`状态之后才会继续进行后面的处理，与之相对的是`Promise.race`只要有一个`promise`对象进入`FulFilled`或者`Rejected`状态的话，就会继续进行后面的处理。

``` js
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
        resolve(delay);
    }, delay);
  });
}
// 任何一个promise变为resolve或reject 的话程序就停止运行
Promise.race([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then(function (value) {
  console.log(value);    // => 1
})
```
上面的代码创建了4个`promise`对象，这些`promise`对象会分别在1ms、32ms、64ms和128ms后变为确定状态，即`FulFilled`，并且在第一个变为确定状态的`1ms`后，`.then`注册的回调函数就会被调用，这时候确定状态的`promise`对象会调用`resolve(1)`因此传递给`value`的值也是`1`，控制台上会打印出`1`来。



