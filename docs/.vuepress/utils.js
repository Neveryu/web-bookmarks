const path = require('path')
const fs = require('fs')

const sidebarMap = require('./sidebarMap')

module.exports = () => {
  const sidebar = {}
  sidebarMap.forEach(({ title, dirname }) => {
    const dirpath = path.resolve(__dirname, '../' + dirname)
    const parent = `/${dirname}/`
    const children = fs.readdirSync(dirpath).filter(item => {
      return item.endsWith('.md') && fs.statSync(path.join(dirpath, item)).isFile()
    }).sort((prev, next) => {
      return next.includes('README.md') ? 1 : 0
    }).map(item => {
      return item.replace(/(README)?(.md)$/, '')
    })
    sidebar[parent] = [
      {
        title,
        children,
        collapsable: false
      }
    ]
  })
  return sidebar
}
