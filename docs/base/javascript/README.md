# 常见问题

## 网页中的宽高

``` js
网页可见区域宽: document.body.clientWidth; 
网页可见区域高: document.body.clientHeight; 
网页可见区域宽: document.body.offsetWidth (包括边线的宽); 
网页可见区域高: document.body.offsetHeight (包括边线的宽); 
网页正文全文宽: document.body.scrollWidth; 
网页正文全文高: document.body.scrollHeight; 
网页被卷去的高: document.body.scrollTop; 
网页被卷去的左: document.body.scrollLeft; 
网页正文部分上: window.screenTop; 
网页正文部分左: window.screenLeft; 
屏幕分辨率的高: window.screen.height; 
屏幕分辨率的宽: window.screen.width; 
屏幕可用工作区高度: window.screen.availHeight;
```

## 移动端按钮点击效果
看来在 iOS 系统的移动设备中，需要在按钮元素或 `body/html` 上绑定一个 `touchstart` 事件才能激活 `:active` 状态。
``` js
document.body.addEventListener('touchstart', function () {
    //...空函数即可
});  
```