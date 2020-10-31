const generate = require('./utils')
const stylusRandom = require('./stylus-random')

module.exports = {
  title: 'web-bookmarks',
  description: '前端工程师知识技能储备库',
  base: '/web-bookmarks/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  themeConfig: {
    logo: '/cute-spear-monster.jpg',
    nav: [
      { 
        text: '基础',
        items: [
          { text: 'HTML', link: '/base/html/' },
          { text: 'CSS', link: '/base/css/' },
          { text: 'JavaScript', link: '/base/javascript/' },
          { text: 'Color', link: '/base/color/'},
          { text: '正则', link: '/base/regx/'}
        ]
      },
      {
        text: '技术',
        link: '/tech/'
      },
      {
        text: '文章',
        link: '/article/'
      },
      {
        text: '工具&网站',
        items: [
          { text: '工具', link: '/tool-site/tool/' },
          { text: '网站', link: '/tool-site/site/' }
        ]
      },
      {
        text: '收藏',
        link: '/favorite/'
      },
      {
        text: '面试',
        link: '/interview/'
      },
      {
        text: '其它',
        items: [
          { text: '圈子', link: '/other/gard/' },
          { text: '其它', link: '/other/another/' },
          { text: 'KOBE', link: '/other/kobe/' }
        ]
      }
    ],
    sidebar: generate(),
    lastUpdated: 'Last Updated', // string | boolean
    
    repo: 'Neveryu/web-bookmarks',
    // repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'Neveryu/web-bookmarks',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    sidebarDepth: 3,
    serviceWorker: {
      updatePopup: {
        message: "网站有新的内容啦！",
        buttonText: "知道了"
      }
    }
  },
  markdown: {
    config: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-include'))
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@public': './public'
      }
    }
  },
  stylus: {
    use: [stylusRandom()]
  }
}