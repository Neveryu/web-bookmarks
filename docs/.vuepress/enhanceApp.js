export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // ...做一些其他的应用级别的优化
  // 注册自定义组件（在.vuepress/components/目录下的组件，不需要手动注册）
  // Vue.component('CustomFooter', require('./components/CustomFooter.vue').default)
}