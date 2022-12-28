<template>
  <div class="text-sunmoon">
    <div class="text" data-text="NeverYu">NeverYu</div>
  </div>
</template>

<style scoped lang="styl">
/*--------故障风格文字效果--------*/
.text-sunmoon{
  /*设置整体的背景颜色*/
  background: black;
  /*使用flex布局 让文字居中*/
  display: flex;
  align-items: center;
}
.text {
  color: white;
  /*你可以使用自己想要的字体，我这里使用的是默认的非衬线体*/
  font-family: sans-serif;
  font-size: 100px;
  /*要把这个关联文字层设置成相对定位，伪元素的绝对定位才会正确叠加到一起*/
  position: relative;
  margin: 0 auto;
}

.text::before {
  content: attr(data-text);
  background: black;
  position: absolute;
  /*产生文字的投影小效果*/
  text-shadow: 2px 0 red;
  left: -2px;
  clip-path: inset(0 0 0 0);
  animation: ani2 2s infinite linear alternate-reverse;
}

.text::after {
  content: attr(data-text);
  background: black;
  position: absolute;
  text-shadow: -2px 0 blue;
  left: 2px;
  clip-path: inset(0 0 0 0);
  animation: ani1 2s infinite linear alternate-reverse;
}

@keyframes ani1 {
  $indent=20
  for $index in 1..$indent {
    {$index*100/$indent + '%'} {
      clip-path: inset(random(0, 100)*1px 0 random(0, 100)*1px 0)
    }
  }
}

@keyframes ani2 {
  $indent=20
  for $index in 1..$indent {
    {$index*100/$indent + '%'} {
      clip-path: inset(random(0, 100)*1px 0 random(0, 100)*1px 0)
    }
  }
}
</style>
