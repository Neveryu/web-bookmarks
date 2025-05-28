const generateSidebar = require("./utils");
const stylusRandom = require("./stylus-random");

module.exports = {
  title: "web-bookmarks",
  description: "前端工程师知识技能储备库",
  base: "/web-bookmarks/",
  plugins: [
    ["@vuepress/back-to-top"],
    ["@vuepress/pwa", {
      serviceWorker: true,
      popupComponent: "MySWUpdatePopup",
      updatePopup: true,
    }]
  ],
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  serviceWorker: false,
  themeConfig: {
    logo: "/cute-spear-monster.jpg",
    nav: [
      {
        text: "基础",
        items: [
          { text: "HTML", link: "/base/html/a1" },
          { text: "CSS", link: "/base/css/a1" },
          { text: "JavaScript", link: "/base/javascript/a1" },
          { text: "Color", link: "/base/color/a1" },
          { text: "正则", link: "/base/regx/a1" },
          { text: "名词释义", link: "/base/word-interpretation/a1" },
        ],
      },

      {
        text: "工具&网站",
        items: [
          { text: "工具", link: "/tool-site/tool/" },
          { text: "网站", link: "/tool-site/site/" },
        ],
      },
      {
        text: "收藏&书",
        items: [
          { text: "收藏", link: "/favorite/" },
          { text: "书", link: "/book/" },
        ],
      },
      {
        text: "面试",
        link: "/interview/",
      },
      {
        text: "rtsp2web",
        link: "/rtsp2web/"
      },
      {
        text: "综合",
        items: [
          { text: "技术", link: "/summary/tech/" },
          { text: "文档", link: "/summary/docs/" },
          { text: "笔记", link: "/summary/notes/" },
          { text: "健康", link: "/summary/health/" },
        ],
      },
      {
        text: "其它",
        items: [
          { text: "音乐", link: "/other/music/" },
          { text: "视频", link: "/other/video/" },
          { text: "圈子", link: "/other/gard/" },
          { text: "KOBE", link: "/other/kobe/" },
          { text: "大S", link: "/other/s/" },
          { text: "文化", link: "/other/culture/" },
          { text: "其它", link: "/other/another/" },
        ],
      },
    ],
    sidebar: generateSidebar(),
    lastUpdated: "Last Updated", // string | boolean

    repo: "Neveryu/web-bookmarks",
    // repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "Neveryu/web-bookmarks",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",
    sidebarDepth: 3,
    smoothScroll: true
  },
  markdown: {
    config: (md) => {
      md.set({ breaks: true });
      md.use(require("markdown-it-include"));
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@public": "./public",
      },
    },
  },
  stylus: {
    use: [stylusRandom()],
  },
};
