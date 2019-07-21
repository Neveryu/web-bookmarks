# 配色方案

## 配色方案
<template>
  <div v-for="color of colors" class="colors-wrapper">
    <address class="colors-name">{{color.title}}</address>
    <div class="item" v-for="item of color.colorArr" :style="{ backgroundColor: item }">
      <span class="value">{{item}}</span>
    </div>
  </div>
</template>


## 配色网站
[https://coolors.co](https://coolors.co) 帮你在线配色的网站，你能找到不少配色灵感
[https://colorhunt.co/](https://colorhunt.co/) 另一个配色网站

<script>
export default {
  data() {
    return {
      // colors: ['red', 'green'],
      colors: [
        {
          title: 'Sunny Day',
          colorArr: ['#4bb4de', '#c1b9ae', '#ffd45d', '#64d59c']
        },
        {
          title: 'Candle',
          colorArr: ['#fb8c6f', '#73607d', '#c1b9ae', '#fdc664']
        },
        {
          title: 'Mystic',
          colorArr: ['#4464be', '#1fafe4', '#85f1ff', '#8db9ff']
        },
        {
          title: 'Summer',
          colorArr: ['#2e8d79', '#5e9488', '#cee8b6', '#8fc69a']
        },
        {
          title: 'Schoolhouse',
          colorArr: ['#75d5a8', '#98d7e5', '#ffdb70', '#fb8570']
        },
        {
          title: 'Plastic',
          colorArr: ['#fe5ebf', '#ff86b6', '#fb8570', '#ffd870']
        },
        {
          title: 'Retro Windows',
          colorArr: ['#61d3ab', '#ff86b6', '#6a9eff', '#feb1a3']
        },
        {
          title: 'Picnic',
          colorArr: ['#eeba4d', '#a9ddd9', '#e3483b', '#21b6af']
        },
        {
          title: 'Mutable',
          colorArr: ['#3b999b', '#5678a2', '#ee5872', '#e3e4e5']
        }
      ]
    }
  }
}
</script>

<style scoped>
.colors-wrapper {
  display: inline-block;
  width: 300px;
  background-color: #2c3c58;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  margin-right: 30px;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 15px;
  transition: .3s;
}
.colors-wrapper:hover {
  transform: scale(1.01);
  cursor: pointer;
}
.colors-name {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
}
.item {
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-left: 20px;
  margin-top: 15px;
  text-align: center;
}
.value {
  background-color: #fff;
  color: #000;
  line-height: 120px;
}
</style>
