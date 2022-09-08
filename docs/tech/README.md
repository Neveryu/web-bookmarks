# 汇总一些技术点



## javascript 计算数组中每个元素出现的次数

#### 一、使用 reduce 函数

```js
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
var countedNames = names.reduce((obj, name) => { 
  if (name in obj) {
    obj[name]++
  } else {
    obj[name]=1
  }
  return obj
}, {})
//reduce的第二个参数就是obj的初始值
console.log(countedNames)
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```