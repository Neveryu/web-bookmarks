# 简单的日期格式format 

### 方案一
```js
// 格式化
function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    '[hH]+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
// 左侧补0
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
```

```js
// 封装
(function(){
  Date.prototype.format = function(fmt) {
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    return formatDate(this, fmt);
  }
  Date.prototype.add = function(count, type) {
    count = parseInt(count);
    type = type || 'day';
    switch(type) {
      case 'year': this.setFullYear(this.getFullYear() + count); break;
      case 'month': this.setMonth(this.getMonth() + count); break;
      case 'day': this.setDate(this.getDate() + count); break;
      case 'hour': this.setHours(this.getHours() + count); break;
      case 'minute': this.setMinutes(this.getMinutes() + count); break;
      case 'second': this.setSeconds(this.getSeconds() + count); break;
    }
    return this;
  }
  Date.parseStr = function (str) {
      var strDate = str || "";
      var array = strDate.split(" ");
      var fullDate = array[0].split(/\D/);
      var fullTime = (array[1] || '').split(/\D/);
      return new Date(fullDate[0], (fullDate[1] || 1) - 1, fullDate[2] || 1, fullTime[0] || 0, fullTime[1] || 0, fullTime[2] || 0);
  }
})()
```
示例：
```js
new Date().format()
new Date().format('yyyy MM dd hh:mm:ss')
```

### 方案二、来源微信小程序

``` js
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
```
示例：
``` js
formatTime(new Date(1245464867486))
2009/06/20 10:27:47
```

### 补充
```js
// 字符串转日期
export function strToDate(strTime){
  return new Date(strTime.replace(/-/g,"/"));
}
/**
 * 字符串转日期格式
 * 兼容各版本IE
 * yyyy-MM-dd hh:mm:ss格式，-和:可以为任一字符
 * 年月日时分秒各字段缺省时为对应最小值
 **/
function strToDateForIE(strDate){
  strDate = strDate || "";
  let array = strDate.split(" ");
  let fullDate = array[0].split(/\D/);
  let fullTime = (array[1] || '').split(/\D/);
  return new Date(fullDate[0], (fullDate[1] || 1) - 1, fullDate[2] || 1, fullTime[0] || 0, fullTime[1] || 0, fullTime[2] || 0);
}

// 获得时间戳
export function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, "/"));
}


/**
 * 获取天数差时间，格式：yyyy-MM-dd
 * @param day
 * @returns {string}
 */
export function getDay(days){
  const now = new Date();
  now.setDate(now.getDate()+days);
  const year = now.getFullYear();
  const month = now.getMonth()+1;
  const date = now.getDate();
  return year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date)
};

/**
 * 获取天数差时间，格式：yyyy-MM-dd HH:mm:ss
 * @param day
 * @returns {string}
 */
export function getDayATime(days) {
  const now = new Date();
  now.setDate(now.getDate()+days);
  const year = now.getFullYear();
  const month = now.getMonth()+1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return year+"-"+(month<10 ? "0" + month : month)+"-"+(date< 10 ? "0" + date : date)+" "+(hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second)
}
```
