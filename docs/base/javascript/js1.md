# undefined 的几种表示方法

::: tip
只能用 === 运算来测试某个值是否是未定义的，因为 == 运算符认为 undefined 值等价于 null
:::

## 字符串 undefined

一个未定义的变量使用 typeof 检测，结果是 "undefined"

``` js
typeof yu === 'undefined'
// true
```

## undefined 类型
``` js
void 0 === undefined
// true
```
