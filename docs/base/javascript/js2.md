# ES6

## 不借助中间变量实现变量交换值
【无需中间变量做存储，借助解构赋值，解决变量交换】
```js
{
  let a = 1
  let b = 2
  [a,b] = [b,a]
  console.log(a, b)  // 2 1
}
```

【不知道函数返回数组的长度是多少，只取第一个，其余的不关心】
```js
{
  function f() {
    return [1,2,3,4,5]
  }
  let a,b,c
  [a, ...b] = f()
  console.log(a,b)
}
```

【json格式对象取值】
```js
{
  let respData = {
    title: 'aaa',
    test: [{
      title: 'bbb',
      desc: 'desc'
    }]
  }
  let {title: aTitle, test: [{title: bTitle}]} = respData
  console.log(aTitle, bTitle)
}
```