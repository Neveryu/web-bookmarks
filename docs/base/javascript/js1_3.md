# 对 xhr 的封装

``` js
var xhr =  new XMLHttpRequest();
```

IE7 及以上支持 XHR 对象，IE6 以下，那么我们必须还需要使用 ActiveX 对象通过 MSXML 库来实现。

【精简常用版】
``` js
var xhr = null;

if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else if(window.ActiveXObject) {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
} else {
  console.log("your browser not support ajax");
}
```

【专业版】
``` js
var xhr = null;

if(window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else if(window.ActiveXObject) {
  var versions = [
    'MSXML2.XMLHttp.6.0',
    'MSXML2.XMLHttp.3.0',
    'MSXML2.XMLHttp',
    'Microsoft.XMLHTTP'
  ];
  for (var i = 0; i < versions.length; i ++) {
    try {
      return new ActiveXObject(version[i]);
    } catch (e) {
      //跳过
      console.log('can not support version[i]')
    }
  }
} else {
  throw new Error('your browser can not support xhr');
}
```

### 封装

``` js
function createXHR() {
  var xmlHttp = null;
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        // alert("您的浏览器不支持AJAX！");
        console.log("your browser not support ajax");
        return false;
      }
    }
  }
  return xmlHttp;
}

var xhr = createXHR();
```

### 使用
【基础版】
``` js
xhr.open('GET','/geturl?channel_id='+channelId, true);  // true代表异步，false代表同步
xhr.setRequestHeader("X-Client","1.0.1;Android;4.1");
xhr.setRequestHeader("X-Token","3E98QW811H");
xhr.onreadystatechange=function(){
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      // 请求成功
      var obj = JSON.parse(xhr.responseText);
      console.log(obj);
    }
  }
};
xhr.send(null);
```

::: tip
open() 方法并不会真正发送请求，而只是启动一个请求以备发送。通过 send() 方法进行发送请求，send() 方法接受一个参数，作为请求主体发送的数据。如果不需要则必须填 null。
:::

【专业版】
``` js
// 封装一个 POST 请求方法
function ajaxPost(url, data, header, fnSucceed, fnFail, fnLoading) {
  var ajax = createXHR();
  ajax.open("post", url, true );
  ajax.setRequestHeader("Country", header);
  ajax.setRequestHeader('Content-Type', 'application/json');
  ajax.onreadystatechange = function () {
    if( ajax.readyState === 4 ) {
      if( ajax.status === 200 ) {
        fnSucceed(ajax.responseText);
      }
      else {
        // fnFail("HTTP请求错误！错误码："+ajax.status );
        fnFail("HTTP request error! error code: " + ajax.status)
      }
    } else {
      fnLoading();
    }
  }
  ajax.send( JSON.stringify(data) );
}
```

::: tip
可以通过 readyState 来了解事件的执行次数，将 send() 方法放到最后不会因为代码的顺序而导致没有加载。并且 send() 方法必须放在 onreadystatechange 之后，才能保证就绪状态变化时调用该事件处理程序，因为要先触发。
:::

::: tip
一般来说，向服务器发送 POST 请求由于解析机制的原因，需要进行特别的处理。
xhr.send("name=yy&age=10");
如果你要模拟表单提交的话，需要设置请求头
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
:::

如果你想传入一个对象的话，可以尝试使用下面的方法转换一下数据。
``` js
// 格式化 post 传递的数据
function postDataFormat(obj){
  if(typeof obj != "object" ) {
    alert("输入的参数必须是对象");
    return;
  }

  // 不支持FormData的浏览器的处理 
  var arr = new Array();
  var i = 0;
  for(var attr in obj) {
    arr[i] = encodeURIComponent(attr) + "=" + encodeURIComponent(obj[attr]);
    i++;
  }
  return arr.join("&");
}
```

### 解读相关知识点
【XML DOM 中 readystatechange 事件】
| 就绪状态 | 说明           |
| :-----: |:-------------:|
| 1       | DOM 正在加载 |
| 2       | DOM 已经加载完数据     |
| 3       | DOM 已经可以使用，但某些部分还无法访问    |
| 4       | DOM 已经完全可以使用     |

【请求收到响应的数据】
一共有四个属性：
responseText -- 作为响应主体被返回的文本
responseXML -- 如果响应主体内容类型是"text/xml"或"application/xml"，则返回包含响应数据的 XMLDOM 文档
status -- 响应的 HTTP 状态
statusText -- HTTP状态的说明

| HTTP 状态码 | 状态字符串              | 说明 |
| :--------: | :-------------------: | :---: |
| 200        | OK                    | 服务器成功返回了页面 |
| 400        | Bad Request           | 语法错误导致服务器不识别 |
| 401        | Unauthorized          | 请求需要用户认证 |
| 404        | Not found             | 指定的URL在服务器上找不到 |
| 500        | Internal Server Error | 服务器遇到意外错误，无法完成请求 |
| 505        | ServiceUnavailable    | 由于服务器过载或维护导致无法完成请求 |

> 我们判断HTTP状态值即可，不建议使用HTTP状态说明，因为在跨浏览器的时候，可能会不太一致。

【abort()】
使用 abort() 方法可以取消异步请求，放在 send() 方法之前会报错。放在 responseText 之前会得到一个空值。

【获取响应头信息】
``` js
// 使用getResponseHeader()获取单个响应头信息
xhr.getResponseHeader('Context-Type');
// 使用getAllResponseHeaders()获取整个响应头信息
xhr.getAllResponseHeaders();
```

### XHR 文档
[MDN - XMLHttpRequest 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)