# 常见面试题1

- var let const 的区别
- 介绍一下 JavaScript 中的事件循环（event loop）& JavaScript 中异步有哪些
- 用 setTimeout 实现 setInterval

-----

<template>
  <div>
    <button class="btn" @click="showTip">答案提示</button>
    <div v-show="show">
      <li>
        <a href="http://es6.ruanyifeng.com/#docs/let" target="_blank">http://es6.ruanyifeng.com/#docs/let</a>
      </li>
      <li>
        <a href="https://www.cnblogs.com/dong-xu/p/7000163.html">https://www.cnblogs.com/dong-xu/p/7000163.html</a>
        <a href="https://www.cnblogs.com/dong-xu/p/7000139.html">https://www.cnblogs.com/dong-xu/p/7000139.html</a>
        <a href="https://blog.csdn.net/lhb_1902056720/article/details/78026825">https://blog.csdn.net/lhb_1902056720/article/details/78026825</a>
        <a href="https://blog.csdn.net/qq_31628337/article/details/71056294">https://blog.csdn.net/qq_31628337/article/details/71056294</a>
        <a href="https://blog.csdn.net/bury_/article/details/79477517">https://blog.csdn.net/bury_/article/details/79477517</a>
        <p>setTimeout、setInterval、ajax、eventListener 等</p>
      </li>
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
