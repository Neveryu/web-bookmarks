const generate = require('./utils')

module.exports = {
  title: 'web-bookmarks',
  description: '前端工程师知识技能储备库',
  base: '/web-bookmarks/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  serviceWorker: false,
  themeConfig: {
    nav: [
      { 
        text: '基础',
        items: [
          { text: 'HTML', link: '/base/html/' },
          { text: 'CSS', link: '/base/css/' },
          { text: 'JavaScript', link: '/base/javascript/' }
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
        text: '库',
        link: '/repository/'
      },
      {
        text: '收藏',
        link: '/favorite/'
      },
      {
        text: '其他',
        items: [
          { text: '面试', link: '/other/interview/' },
          { text: '圈子', link: '/other/gard/' },
          { text: '其他', link: '/other/another/' }
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
  }
}