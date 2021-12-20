# html5shiv

### Description
**HTML5shiv** `is a javscript workaround to provide support for the new HTML 5 elements in IE Browsers older than IE 9`。

- 越来越多的站点开始使用HTML5标签。但是目前的情况是还有很多人在使用IE6，IE7，IE8。
- 而IE6，IE7，IE8是不能识别 `html5` 标签的。
- 这里提供一种让IE浏览器支持 `html5` 的方法，那就是使用 `html5shiv`。
- `html5shiv` 主要解决 HTML5 提出的新的元素不被 `IE6-8` 识别。

### 实现原理
　　**这些html5新元素不能被IE6-8识别，不能作为父节点包裹子元素，并且不能应用CSS样式。让CSS 样式应用在未知元素上只需执行 `document.createElement(elementName)` 即可实现。html5shiv就是根据这个原理创建的。**

> 关于HTML5不得不提IE，在苹果、Google、Opera和Mozilla等主流浏览器厂商积极参与新版本HTML标准的制定和推广时，微软却对HTML5规范不屑一顾。然而微软近期才表态要在IE中支持HTML5,以致到今天为止的IE8及以下是无法支持HTML5标签的.

### Syntax

html5shiv 的使用非常的简单，考虑到IE9是支持 `html5` 的，所以只需要在页面 `head` 中添加如下代码即可： 
``` html
<!-–[if lt IE 9]-->
    <script src="./js/html5shiv.js "></script >
<!--[endif]–- > 
```

The syntax for the HTML5shiv is : 
``` html
<head>
  <!--[if lt IE 9]>
  <script src="./js/html5shiv.js"></script>
  <![endif]-->
</head>
```

### 为什么要使用html5的新标签？
* `<header>`定义页面或区段的头部
* `<footer>`定义页面或区段的尾部
* `<nav>`定义页面或区段的导航区域
* `<section>`页面的逻辑区域或内容组合
* `<article>`定义正文或一段完整的内容
* `<aside>`定义补充或相关内容

使用他们能让代码语义化更直观，而且更方便SEO优化，但是此HTML5新标签在IE6/IE7/IE8上并不能识别，需要javascript处理，所以我们就需要使用目前使用最广泛的html5shiv.js了，包括 `bootstrap` 框架也是使用的这个来兼容低版本IE的。


### 注意事项
#### 注意事项一
在引入了html5shiv.js以后，还需要在你自己的css文件中添加:
``` css
article,aside,dialog,footer,header,section,footer,nav,figure,menu{
  display:block;
}
```
主要是让这些html5标签成块状,像div那样。

No matter how ways what did you using, you should be initialize the new lable css.
``` css
article,aside,dialog,footer,header,section,footer,nav,figure,menu{
  display:block;
}
```


#### 注意事项二
　　因为html5shiv.js是JavaScript文件，如果IE6/7/8 禁用脚本的用户,那么就变成了无样式的"白板"网页,我们该怎么解决呢?
　　我们可以参照 `Facebook` 的做法，即引导用户进入带有noscript标识的页面，用xhtml标签替换html5标签，这要比为了保持兼容而写大量hack的作法更轻便一些。
``` html
<!--[if lte IE 8]> 
<noscript>
<style>
  .html5-wrappers{display:none!important;}
</style>
<div class="ie-noscript-warning">您的浏览器禁用了脚本，请<a href="#">查看这里</a>来启用脚本!或者<a href="/?noscript=1">继续访问</a>.
</div>
</noscript>
<![endif]-->
```
    
这样可以引导用户开启脚本，或者直接跳到xhtml标签设计的页面。


#### 注意事项三

* HTML5shiv is found within the `<head>` tag.
* HTML5shiv is a javascript file that is referenced in a `<script>` tag.
* You should usr HTML5shiv when you are using the new HTML5 element such as : `<header>,<footer>,<nav>,<aside>,<article>`
* Download the latest version of HTML5shiv from [github](https://github.com/aFarkas/html5shiv/) or reference the Open Source Software CDN version at `https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js` or `https://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js`.
* You will require the HTML5shiv to provide compatibility for IE Browser older than IE 9.

#### Example
HTML 5 Document
If you created a new web page in HTML5,you would include the HTML5shiv as follows:
``` html
<head>
<meta charset="UTF-8">
<!--[if lt IE 9]>
  <script src=".js/html5shiv.min.js"></script>
<![endif]-->
</head>
```
In this HTML 5 Document example,we have added HTML5shiv within the `<head>` tag.In this case,the HTML5shiv is a javascript file called `<i>html5shiv.js</i>` found in the ./js directory.

If you did not want to download and store the HTML5shiv on your site,you could reference the version found on the Open Source Software CDN site.
```

### support two CDN site.
``` html
<head>
<meta charset="UTF-8">
<title>HTML 5 Example by github.com/neveryu</title>
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<![endif]-->
</head>
```
``` html
<head>
<meta charset="UTF-8">
<title>HTML 5 Example by github.com/neveryu</title>
<!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js"></script>
<![endif]-->
</head>
```

#### 注意事项四

HTML 4.0.1 Transitional Document
HTML5shiv does not apply to HTML 4.0.1 Transitional.

XHTML 1.0 Transitional Document
HTML5shiv does not apply to XHTML 1.0 Transitional.

XHTML 1.0 Strict Document
HTML5shiv does not apply to XHTML 1.0 Strict.

XHTML 1.1 Document
HTML5shiv does not apply to XHTML 1.1.



### Tips
关于低版本浏览器不能识别html5标签的问题，除了使用html5shiv.js之外，还有一种做法就是为网站创建多套模版，通过程序对User-Agent的判断给不同的浏览器用户显示不同的页面，比如优酷网就是采用的这种模式。

### 总结
**HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries**