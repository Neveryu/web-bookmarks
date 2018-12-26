# Vue

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


### 为 vue 实例添加属性
前期采用 vue-resource，后期改为 axios，方便修改，因此写了： `Vue.prototype.$http = axios;`
上面这句话是什么意思呢？
意思就给全局设置了一个变量 $http 值是 axios