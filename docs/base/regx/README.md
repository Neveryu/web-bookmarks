# 邮箱📮

1、邮箱正则表达式一（来源 [Element UI](https://element.eleme.io/#/zh-CN/component/message-box)）

```
/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
```

How to use：
```js
var pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
var email = 'xxxxx@xxxx.com'

console.log(pattern.test(email)) // true
```