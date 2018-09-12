const generate = require('./utils')

module.exports = {
  title: 'web-bookmarks',
  description: '前端工程师知识技能储备库',
  base: '/web-bookmarks/',
  serviceWorker: true,
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
        text: '库',
        link: '/repository/'
      },
      {
        text: '收藏',
        link: '/favorite/'
      },
      {
        text: '圈子',
        link: '/gard/'
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
        message: "网站有更新～",
        buttonText: "刷新"
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