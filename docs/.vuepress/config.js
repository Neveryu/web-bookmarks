module.exports = {
  title: 'web-bookmarks',
  description: '前端工程师知识技能储备库',
  base: '/web-bookmarks/',
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
        text: '库',
        link: '/repository/'
      },
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated', // string | boolean
    
    repo: 'Neveryu/web-bookmarks',
    // repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'Neveryu/web-bookmarks',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页'
  }
}