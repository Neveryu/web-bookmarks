---
sidebar: auto
---

# JavaScript

## 去除数组的重复成员
``` js{4}
let unique = [...new Set(array)]
```
*ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值*
``` js{4}
// 去除数组重复成员的另一种方法
Array.from(new Set(array))
```