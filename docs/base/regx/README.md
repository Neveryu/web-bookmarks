# 常用正则规则

## 邮箱📮

1、邮箱正则表达式一（来源 [Element UI](https://element.eleme.io/#/zh-CN/component/message-box)）

```js
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
```js
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

## 匹配6位连续的数字（123456）
> 连续的6个数字

一、
``` js
(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){5}\d
```

二、
``` js
\d((?<=0)1|(?<=1)2|(?<=2)3|(?<=3)4|(?<=4)5|(?<=5)6|(?<=6)7|(?<=7)8|(?<=8)9){5}
```

## 身份证
```js
/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
```

How to use:
```js
var pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
var number = '1234567'
console.log(pattern.test(number))  // false
```

## 正则大全
[https://any86.github.io/any-rule/](https://any86.github.io/any-rule/)











