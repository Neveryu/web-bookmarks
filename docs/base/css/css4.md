# CSS hack 手段


一些 base 的 css 文件，可以直接使用在项目中去，也可以借鉴其中的一些做法。

`custom-one.css` 在样式重置方面做的很棒，而且提供了大量的内外边距的 class。
`print.css` 统一打印样式就是用这个吧。

### 一、

``` css
*html {
    _background-image:url(about:blank);
    _background-attachment:fixed;
}

```
这个是什么意思？
这段代码是专为 IE6 写的，帮助相对于窗口固定位置的元素实现无抖动效果。
当你想在页面的某个区域始终存在（浮动）一个网页元素，比如一个 DIV ，你希望它能始终浮动在窗口的某个位置（比如页面两侧）。
在 IE7 以上的浏览器以及标准浏览器，都支持一个属性 `position:fixed` ，可以很简单地实现想要的效果，而且当窗口滚动时，该元素的滚动也会很平滑。。。但是在 IE6 及以下的版本浏览器下，并不支持该属性，所以只好使用 `position:absolute` 来代替实现，但新问题出现，你会发现，当滚动窗口时，该元素会出现抖动的现象，看起来就很不舒服，为了去掉这个抖动的 Bug ，为了实现平滑滚动，就有了以上这个 css 代码。
具体的效果你最好自己去试试，一看实际效果就能马上明白了…


### 二、