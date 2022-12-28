<template>
  <div class="loading">
    <div class="container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
/*------- Loading ---------*/
.loading{
  /*  用flex布局让container整个标签居中  */
  display:flex;
  justify-content:center;
  align-items:center;
  /*height:100vh;*/
  /*width:100vw;*/
}
.container{
  width:120px;
  height:120px;
/*   background:red; */
  position:relative;
/*  子元素这样才能以父元素作为定位基准  */
}

.container div{
  height:40%;
  width:40%;
  border-radius:50%;
  position:absolute;
  animation:loading 2s ease infinite ;
}
/* 注意container 之后加空格 */
.container :first-child{
  background:#C299FC;
}
.container :nth-child(2){
  background:#FFD739;
  animation-delay:-0.5s;
}
.container :nth-child(3){
  background:#9852F9;
  animation-delay:-1s;
}
.container :last-child{
  background:#6807F9;
  animation-delay:-1.5s;
}

@keyframes loading {
  0%,100%{
    transform:translate(0,0)
  }
  25%{
    transform:translate(150%,0)
  }
  50%{
    transform:translate(150%,150%)
  }
  75%{
    transform:translate(0,150%)
  }
}
</style>