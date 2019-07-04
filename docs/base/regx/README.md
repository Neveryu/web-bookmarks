# 常用正则规则

## 邮箱📮

1、邮箱正则表达式一（来源 [Element UI](https://element.eleme.io/#/zh-CN/component/message-box)）

```
/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
```

How to use：
```js
var pattern = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
var email = 'xxxxx@xxxx.com'

console.log(pattern.test(email)) // true
```

## 手机号码☎️

1、手机号码正则表达式一
```
/^1[3456789]\d{9}$/
```

How to use:
```js
var pattern = /^1[3456789]\d{9}$/
var phone1 = '1234567'
var phone2 = '1334567890'
var phone3 = '13333333333'

console.log(pattern.test(phone1))  // false
console.log(pattern.test(phone2))  // false
console.log(pattern.test(phone3))  // true
```

