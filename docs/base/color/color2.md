# 渐变色

## 渐变色
<template>
  <div class="wrapper" v-for="color of colors">
    <div v-for="item of color.colorArr" class="item one" :style="{ backgroundColor: item }"></div>
    <p class="txt">
      <span v-for="item of color.colorArr">{{item}}, </span>
    </p>
    <div v-for="(item, index) of color.colorArr" v-if="index !== color.colorArr.length-1" class="item two" :style="{ background: 'linear-gradient(to bottom right, ' + item + ',' + color.colorArr[++index] + ')' }"></div>
    <div class="item two" :style="{ background: color.colorArr.slice(-1) }"></div>
  </div>
</template>


## 渐变色网站
[https://uigradients.com](https://uigradients.com) 渐变色网站

<script>
export default {
  data() {
    return {
      colors: [{
        colorArr: ['#4e4d4d', '#8f63de', '#da20a9', '#ff54af', '#f2c87c']
      },{
        colorArr: ['#541d61', '#8f3066', '#c05166', '#e88666', '#fcb76f']
      },{
        colorArr: ['#205374', '#27a09e', '#30ce88', '#7de393', '#d3f5ce']
      },{
        colorArr: ['#014289', '#006faf', '#009ac0', '#00ccbc', '#60f3ab']
      },{
        colorArr: ['#4c3633', '#795a70', '#8f86a6', '#a3b5c1', '#c8dcd2']
      },{
        colorArr: ['#1f4e5a', '#009c8e', '#ffdb6a', '#ffa658', '#ea5f40']
      },{
        colorArr: ['#3b3b3b', '#8c6a3f', '#ffda20', '#f3df7a', '#f7f5df']
      },{
        colorArr: ['#5d4057', '#848689', '#a8caba', '#c9d7b2', '#ebe3aa']
      },{
        colorArr: ['#6d6875', '#b4838d', '#e5989b', '#ffb4a2', '#ffccb2']
      }]
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
  width: 330px;
  margin-top: 15px;
  margin-bottom: 30px;
  text-align: center;
  padding: 20px 10px;
  transition: .3s;
  margin-right: 10px;
}
.wrapper:hover {
  transform: scale(1.01);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  cursor: pointer;
}
.item {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  transform: rotate(-45deg);
}
.txt {
  font-size: 14px;
}
</style>