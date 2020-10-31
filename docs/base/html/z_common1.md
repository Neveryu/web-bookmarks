# 常见问题

## 去掉输入框缓存，以及有黄色背景
PC上面输入框缓存用户输入，而且选择缓存的内容到输入框后，输入框有黄色背景

``` html
<!-- 最简单的做法就是不要自动补全的功能-->
<input type="text" autocomplete="off">
```

## 输入框只能输入数字
``` html
<input type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]/g,'')"/> 
```
其中，onafterpaste 防止用户从其它地方 copy 内容粘贴到输入框。

## 禁止粘贴
``` html
<input type="text" onpaste="return false;"/>
```
在该例子中，利用 return false 阻止了黏贴这一行为。在实际应用中，当有一些比较重要的数据时，如手机号、登录密码、网银账号等，为了安全考虑必须手动输入，因此在这些表单文本域，通常是设置为禁止黏贴的。
