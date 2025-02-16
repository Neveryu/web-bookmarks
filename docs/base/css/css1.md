# 使用css追踪用户是否点击某个链接

``` css
#link2:active::after {
  content: url("track.php?action=link2_alicked");
}
```