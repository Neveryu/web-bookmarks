# Vue

## 要点
<font color="red">1、在 Vue 项目中，Vue 的版本号一定是要和我们的 `vue-template-compiler` 的版本号一致。</font>

## Vue 中使用 CSS 预处理器

> 推荐使用 stylus

### Stylus
``` bash
npm i stylus stylus-loader -D
```

### Sass
``` bash
npm i node-sass sass-loader -D
```


## 为 Vue 实例添加属性

前期采用 vue-resource，后期改为 axios，方便修改，因此写了： `Vue.prototype.$http = axios;`
上面这句话是什么意思呢？
意思就给全局设置了一个变量 $http 值是 axios。