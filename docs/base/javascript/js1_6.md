# 原生js 实现 textarea，input输入框监听和输入字数限制

``` html
<textarea class="wishContent" placeholder="请输入不超过15个字" maxlength="15">
</textarea>
<span class="wordsNum">0/15</span>
```

``` js
//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {

    //获取输入内容
    var userDesc = $(this).val();

    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 15);
    } else {
        len = 0
    }

    //显示字数
    $(".wordsNum").html(len + '/15');
});
```




