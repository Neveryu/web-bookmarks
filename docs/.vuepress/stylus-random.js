/*一个stylus plugin，用于生成随机数*/
module.exports = function() {
  return function(style) {
    style.define('random', function(min, max) {
      if(min === undefined || max === undefined) {
        return Math.random()
      }
      return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min)
    })
  }
}
