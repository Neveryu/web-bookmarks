# 常见面试题1

- 1、var let const 的区别
- 2、介绍一下 JavaScript 中的事件循环（event loop）& JavaScript 中异步有哪些
- 3、用 setTimeout 实现 setInterval
- 4、什么是跨域 & 解决方案
- 5、call、apply、bind 区别
- 6、addEventListener 第三个参数是什么意思
- 7、统计一篇英文文章中哪个单词出现的次数最多
- 8、vue 中如何实现数据的双向绑定

-----

<template>
  <div>
    <button class="btn" @click="showTip">答案提示</button>
    <div v-show="show">
      <p>
        1、<a href="http://es6.ruanyifeng.com/#docs/let" target="_blank">http://es6.ruanyifeng.com/#docs/let</a>
      </p>
      <p>
        2、【有一些浏览器会输出：'script start'、'script end'、'setTimeout'、'promise1'、'promise2'。这些浏览器将会在 'setTimeout' 之后输出 Promise 的回调函数，这看起来像是这类浏览器不支持 microtask 而将 Promise 的回调函数作为一个新的 task 来执行。】
        <br>
        【如果说把 Promise 当做一个新的 task 来执行的话，这将会造成一些性能上的问题，因为 Promise 的回调函数可能会被延迟执行，因为在每一个 task 执行结束后浏览器可能会进行一些渲染工作。】
      </p>
      <p>
        <a href="https://www.cnblogs.com/dong-xu/p/7000163.html">深入理解 JavaScript 事件循环（一）— event loop</a>
        <br>
        <a href="https://www.cnblogs.com/dong-xu/p/7000139.html">[译]深入理解 JavaScript 事件循环（二）— task and microtask</a>
      </p>
      <p>
        【宏任务，微任务】
        【Macrotasks => 一般会将dom事件、ajax事件、setTimeout、script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。 放入到这个队列中。】
        【Microtasks => 一般会将Promise、process.nextTicks、Object.observe、MutationObserver放入这个队列中。】
      </p>
      <p>异步：setTimeout、setInterval、ajax、eventListener 等</p>
      <p>
        3、略
      </p>
      <p>
        4、<a href="https://blog.csdn.net/csdn_yudong/article/details/54346536">js和jquery使用jsonp解决跨域</a>
      </p>
      <p>
        5、<a href="https://blog.csdn.net/csdn_yudong/article/details/78730844">清晰明了搞懂 call、apply、bind 的区别</a>
      </p>
      <p>
        6、<a href="https://blog.csdn.net/csdn_yudong/article/details/70156293">[JavaScript]onclick、addEventListener、attachEvent详解</a>
      </p>
      <p>
        7、略
      </p>
      <p>
        8、<a href="https://cn.vuejs.org/v2/guide/reactivity.html">Vue 深入响应式原理</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showTip() {
      this.show = !this.show
    }
  }
}
</script>
<style>
  button.btn {
    border: none;
    outline: none;
    color: #3eaf7c;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  span.answer {
    color: red;
  }
</style>
