# 常见面试题1

- var let const 的区别
- 介绍一下 JavaScript 中的事件循环（event loop）& JavaScript 中异步有哪些
- 用 setTimeout 实现 setInterval
- 什么是跨域 & 解决方案

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
      <p>setTimeout、setInterval、ajax、eventListener 等</p>
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
