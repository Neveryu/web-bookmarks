# 常见问题

## 移动端输入框有边框内阴影
``` css
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```
在 iOS 上,输入框默认有内部阴影,但无法使用 box-shadow 来清除,如果不需要阴影,可以这样关闭:
``` css
input,textarea {
  border: 0; /* 方法1 */
  -webkit-appearance: none; /* 方法2 */
}
```

## 输入框/文本域选中后有边框
``` css
outline: none;
```

## 移动端 select 样式修改
移动端浏览器 select 样式要修改的话，加上：
``` css
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```

## 移动端按钮/输入框/文本域点击/长按有阴影
``` css
-webkit-tap-highlight-color: transparent;
/* 或者 */
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```

## 去掉输入框缓存，以及有黄色背景
PC上面输入框缓存用户输入，而且选择缓存的内容到输入框后，输入框有黄色背景

``` html
<!-- 最简单的做法就是不要自动补全的功能-->
<input type="text" autocomplete="off">
```

## 去掉移动端文字选中阴影和选项
``` css
-webkit-touch-callout: none;
```

## 去掉网页文本内容选中的蓝色背景
关于PC网页上文本内容默认可以用鼠标选中有蓝色背景，如果不需要可以在css中添加
``` css
-moz-user-select: none; /*火狐*/
-webkit-user-select: none; /*webkit浏览器*/
-ms-user-select: none; /*IE10*/
-khtml-user-select: none; /*早期浏览器*/
user-select: none;
```

## 取消手机点击时出现的灰块
``` css
html, body {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
a, div {
  -webkit-tap-highlight-color: transparent; 
  -moz-tap-highlight-color: transparent; 
  -ms-tap-highlight-color: transparent; 
  -o-tap-highlight-color: transparent; 
  tap-highlight-color: transparent;
}
```
去掉点击链接和文本框对象时默认的灰色半透明覆盖层（ios）或者虚框（android）移动端网站或APP点击后出现闪动或灰色背景|只需对绑定事件添加class样式使其触发事件时背景为透明色
``` css
.class {
  -webkit-tap-highlight-color:transparent;
  -webkit-tap-highlight-color:rgba(0,0,0,0); //透明度设置为0
}
```
