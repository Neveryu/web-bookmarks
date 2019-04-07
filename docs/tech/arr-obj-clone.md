# 数组或者对象的浅拷贝&深拷贝

> 数组、对象、Function 属于引用类型；基本类型不存在拷贝的问题，所以不讨论。

## 数组

1、slice()
2、concat()
3、Array.from()
4、
```
var arr1 = [1,2,3]
var arr2 = [...arr1]
```

## 对象
1、Object.assign()
2、let objClone = { ...obj }
3、JSON.parse(JSON.stringify(obj))

## 封装一个递归方法来实现完美的深拷贝的功能

[https://blog.csdn.net/csdn_yudong/article/details/80326848](https://blog.csdn.net/csdn_yudong/article/details/80326848)