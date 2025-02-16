/**
 * 页面是否需要侧边栏
 * 侧边栏配置：
 * title： 侧边栏Title
 * driname: 路径
 */
const sidebarMap = [
  /*基础*/
  { title: 'HTML', dirname: 'base/html' },
  { title: 'CSS', dirname: 'base/css'},
  { title: 'JavaScript', dirname: 'base/javascript' },
  { title: 'Color', dirname: 'base/color' },
  { title: '正则表达式', dirname: 'base/regx' },
  { title: '名词释义', dirname: 'base/word-interpretation'},
  { title: '工具', dirname: 'tool-site/tool' },
  { title: '网站', dirname: 'tool-site/site' },
  { title: '收藏', dirname: 'favorite' },
  { title: '书', dirname: 'book' },
  { title: '面试', dirname: 'interview' },
  { title: 'rtsp2web', dirname: 'rtsp2web'},
  /*综合*/
  { title: '技术', dirname: 'summary/tech' },
  { title: '文档', dirname: 'summary/docs'},
  { title: '笔记', dirname: 'summary/notes'},
  { title: '健康', dirname: 'summary/health'},
  /*其它*/
  { title: '视频', dirname: 'other/video' },
  { title: '圈子', dirname: 'other/gard' },
  { title: '其它', dirname: 'other/another' },
  { title: '文化', dirname: 'other/culture' },
  { title: '科比', dirname: 'other/kobe' },
  { title: '大S', dirname: 'other/s'}
  /*在页面顶部配置了sidebar: auto，就不用在这里配了*/
]

module.exports = sidebarMap