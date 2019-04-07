# Vue

## 要点
<font color="red">1、在 Vue 项目中，Vue 的版本号一定是要和我们的 `vue-template-compiler` 的版本号一致。</font>

<font color="red">2、Vue 打包后的文件分别是什么意思：</font>
- `mainifest.js`  ——  静态资源清单
- `vendor.js`  —— `node_modules` 里面的包打包出来的
- `app.js` —— 源码打包出来的

## Vue 中使用 CSS 预处理器

> node-sass 的下载总是不稳定，推荐使用 stylus


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

## 模式一

用户登录成功之后，我们会在全局钩子 `router.beforeEach` 中拦截路由，判断是否已获得 `token`，在获得 `token` 之后，我们就要去获取用户的基本信息了。

就如前面所说的，我只在本地存储了一个用户的 `token`，并没有存储别的用户信息（如用户权限，用户名，用户头像等）。有些人会问为什么不把一些其它的用户信息也存一下？主要出于如下的考虑：

假设我把用户权限和用户名也存在了本地，但我这时候用另一台电脑登录修改了自己的用户名，之后再用这台存有之前用户信息的电脑登录，它默认会去读取本地 `cookie` 中的名字，并不会去拉去新的用户信息。

所以现在的策略是：页面会先从 `cookie` 中查看是否存有 `token`，没有，就走一遍上一部分的流程重新登录，如果有 `token`，就会把这个 `token`返给后端去拉取 `user_info`，保证用户信息是最新的。
当然如果是做了单点登录得功能的话，用户信息存储在本地也是可以的。当你一台电脑登录时，另一台会被提下线，所以总会重新登录获取最新的内容。

> 而且从代码层面我建议还是把 `login` 和 `get_user_info` 两件事分开比较好，在这个后端全面微服务的年代，后端同学也想写优雅的代码~