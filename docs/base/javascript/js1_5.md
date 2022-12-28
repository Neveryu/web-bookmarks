# 去除数组的重复成员

一、遍历数组arr，把元素分别放入另一个数组result中，判断arr中的元素在result中是否存在，不存在即加入result中

``` js
function unique(arr){
  var result = []
  for(var i in arr){
    if(result.indexOf(arr[i]) === -1){
      result.push(arr[i])
    }
  }
  return result
}
```

示例：

<template>
  <div class="example">
    <p>原数组：foo = {{foo}}</p>
    <input type="text" v-model.number.trim="foo1" maxlength="10" :disabled="isDisabled" :placeholder="placeholder">
    <button @click="insertFoo(foo1)">添加</button>
    <p>var bar = unique(foo)</p>
    <p>console.log(bar)  =>  {{unique(foo)}}</p>
  </div>
</template>

二、ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。使用这个特性可以为数组去重
``` js
let unique = [...new Set(array)]
```
示例：
``` js
let koo = [1, 2, 3, 4, 5, 4, 6, 66, 13, 2, 99]
let result = [...new Set(koo)]
console.log(result)
// [ 1, 2, 3, 4, 5, 6, 66, 13, 99 ]
```

三、或者

``` js
// 去除数组重复成员的另一种方法
Array.from(new Set(array))
```
示例：
``` js
let arr = [1, 2, 3, 4, 5, 4, 6, 66, 13, 2, 99]
let result = Array.from(new Set(arr))
console.log(result)
// [ 1, 2, 3, 4, 5, 6, 66, 13, 99 ]
```

<script>
export default {
  data() {
    return {
      maxLength: 40,
      foo: [1, 2, 3, 4, 5, 4, 6, 66, 13, 2, 99],
      foo1: '',
      isDisabled: false,
      placeholder: ''
    }
  },
  methods: {
    insertFoo(v) {
      if(this.foo.length >= this.maxLength) {
        this.isDisabled = true
        this.foo1 = ''
        this.placeholder = '别搞了'
        return false
      }
      this.foo.push(v)
    },
    unique(arr){
      var result = []
      for(var i in arr){
        if(result.indexOf(arr[i]) === -1){
          result.push(arr[i])
        }
      }
      return result
    }
  }
}
</script>

<style>
  .example {
    border: 1px solid #3eaf7c;
    border-radius: 6px;
    padding: 5px 10px;
  }
</style>
