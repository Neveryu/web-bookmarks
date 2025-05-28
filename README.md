<p align="center">
  <a href="https://neveryu.github.io/web-bookmarks/" target="_blank">
    <img width="280" src="https://raw.githubusercontent.com/Neveryu/web-bookmarks/master/docs/.vuepress/public/cute-spear-monster.jpg" alt="logo">
  </a>
</p>

<p align="center">
  <a href="https://vuepress.vuejs.org/">
    <img src="https://img.shields.io/badge/vuepress-1.9.10-brightgreen.svg" alt="Vuepress">
  </a>
  <a href="https://github.com/Neveryu/web-bookmarks/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/vuepress.svg" alt="License">
  </a>
  <a href="https://github.com/Neveryu/web-bookmarks/actions">
    <img src="https://github.com/Neveryu/web-bookmarks/workflows/CI/badge.svg" alt="Build">
  </a>
  <a href="https://neveryu.github.io/reward/index.html">
    <img src="https://img.shields.io/badge/%24-donate-ff69b4.svg" alt="donate">
  </a>
</p>


# Web Bookmark

Base on `vuepress`@1.9.10

汇总，收藏一些前端技术和周边，在线地址： [web-bookmarks](https://neveryu.github.io/web-bookmarks/)

**收藏汇总一些工作学习中，经常用到的一些知识，避免重复查找，以及关键时候找不到的尴尬；包括基础知识，关键技术点，好的文章，网站，工具，面试，整理的笔记以及一些周边花絮**

**如果你有好的推荐，你可以提 issue 或者 pr 来告诉我，谢谢**

### 基础
- [HTML](https://neveryu.github.io/web-bookmarks/base/html/)
- [CSS](https://neveryu.github.io/web-bookmarks/base/css/)
- [JavaScript](https://neveryu.github.io/web-bookmarks/base/javascript/)
- [Color](https://neveryu.github.io/web-bookmarks/base/color/)
- [正则](https://neveryu.github.io/web-bookmarks/base/regx/)

### [技术](https://neveryu.github.io/web-bookmarks/tech/)
### [文章](https://neveryu.github.io/web-bookmarks/article/)

### [收藏](http://localhost:8080/web-bookmarks/favorite/)

### 工具&网站
- [工具](https://neveryu.github.io/web-bookmarks/tool-site/tool/)
- [网站](https://neveryu.github.io/web-bookmarks/tool-site/site/)

## Development

> Please make sure your version of Node.js is greater than 8.

``` bash
# 安装依赖
yarn

# 运行本地环境
yarn run dev
```

## deploy
```bash
# 构建/打包
yarn run build
```

## 部署 Github Pages

您可以借助 Github Action 的自动构建能力，直接推送源代码到远程仓库即可。

> 由于我们经常偶尔的更新一些小的内容，为了避免 `git log` 混乱，以及 `.git` 文件夹内容过大，导致 clone 缓慢的问题；我自定义了 `deploy.sh` 脚本，每次更新的时候执行 `deploy.sh` 脚本会删掉之前的所有提交记录，并重新提交到 Github，然后通过 Github Action 的自动构建能力，部署页面。

> 但是这样呢，每次都是重新提交全部的新代码，数据量会比较大，在网络环境不好的情况下，可能上传代码会很慢；建议呢，多数情况下，还是正常使用 `git push` 命令来上传代码。在积累了很多次的提交以后，下一次可以使用 `./deploy.sh` 来提交以及刷新 `git` 仓库。


## Showcase

Websites built with VuePress。

## VuePress
> Minimalistic docs generator with Vue component based layout system

[https://vuepress.vuejs.org/](https://vuepress.vuejs.org/)

## License

[MIT](https://github.com/Neveryu/web-bookmarks/blob/master/LICENSE)