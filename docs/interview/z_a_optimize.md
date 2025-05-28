# 优化小技巧

::: tip
代码优化是一门很深的学问，考验一个人的基本功，内力，经验，以及工作中的思考和总结。如果对这块感兴趣的，可以专门找一些书学习一下。【列一些专业的书籍】
:::

下面，是实战中的一些总结：

一、

```js
if(jqXHR.statusText === "Hello" || jqXHR.statusText === "OK" || jqXHR.statusText === "success") {...}
// 改为
if(['Hello', 'OK', 'success'].indexOf(jqXHR.statusText) > -1) {...}
```

二、

```js
// todo
```