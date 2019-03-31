# 颜色

<template>
  <div id="color-page">
    <div v-for="(item, index) of allColors">
      <p align="center" :style="{ textTransform: 'uppercase', fontSize: '22px', color: item.value[0]}">{{item.name}}</p>
      <div style="display: flex; flex-flow: row wrap;">
        <div class="color" v-for="(c, index) of item.value" style="flex: 1">
          <span class="swatch" :style="{ backgroundColor: c }" style="display: block; height: 120px; width: 100%;"></span>
          <span>{{c}}</span>
        </div>
      </div>
      <p><hr></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allColors: [{
        name: 'red',
        value: ['#b60205']
      },{
        name: 'orange',
        value: ['#ff8f00', '#f08d49']
      },{
        name: 'yellow',
        value: ['#ffac38']
      },{
        name: 'green',
        value: ['#006b75', '#0e8a16', '#9ed361', '#59d683', '#c2e0c6']
      },{
        name: 'blue',
        value: ['#8ed9e2']
      },{
        name: 'purple',
        value: ['#5319e7', '#9631e2', '#cc99cd', '#8b9fef']
      }]
    } 
  }
}
</script>

<style>
  .color {
    padding-right: 1.8888%;
  }
  .color>.swatch {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
</style>