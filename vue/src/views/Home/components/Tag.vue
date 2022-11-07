<template>
  <span class="tags" :style="{ fontSize: noramlSize }"> {{ props.tname }}</span>
</template>
<script setup>
const props = defineProps({
  tname: String
})


/* 
 * 利用 Box-Muller 方法极坐标形式 
 * 使用两个均匀分布产生一个正态分布
*/
const $Normal = function (mean, sigma) {
  var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
  do {
    //获得两个（-1,1）的独立随机变量
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w == 0.0 || w >= 1.0)
  c = Math.sqrt((-2 * Math.log(w)) / w);
  return mean + u * c * sigma;
}

const noramlSize = () => {
  return $Normal(18, 6) + "px"
}
</script>
<style lang="less" scoped>
.tags {
  cursor: pointer;
  font-size: 12px;
  margin: 5px;
  display: inline-block;
  user-select: none;
  transition: color 0.15s ease 0s;
  color: rgba(255, 255, 255, 0.6);
}

.tags:hover {
  color: rgba(255, 255, 255, 0.8);
}
</style>