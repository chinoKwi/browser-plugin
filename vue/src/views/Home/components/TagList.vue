<template>
  <div class="tag-body">
    <div class="tag-body-tags">
      <div v-for="(item, index) in tags" :key="index" class="tag-body-tags-li">
        <Tag v-for="(tag, index) in item" :key="tag" :tname="tag" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import Tag from './Tag.vue'

const props = defineProps({
  tagList: Array
})
const list = ref([])


/*
 * 随机拆分一个数
 * params 总和，个数，最大值 {num}
 */
const $RandomSplit = function (total, nums, max) {
  let rest = total;
  let result = Array.apply(null, { length: nums })
    .map((n, i) => nums - i)
    .map(n => {
      const v = 1 + Math.floor(Math.random() * (max | rest / n * 2 - 1));
      rest -= v;
      return v;
    });
  result[nums - 1] += rest;
  return result;
}
//类正态排序
const $NormalSort = function (arr) {
  var temp = [], i = 0, l = arr.length, leftTo = 0, rightTo = 0,
    sortArr = arr.sort(function (a, b) { return b - a }); //先将数组从大到小排列得到 [7,6,5,5,4,3,2,1]
  while (arr.length > 1) {
    let a = arr.pop();
    let b = arr.pop();
    if (leftTo < rightTo) {
      temp[i] = b;
      temp[l - (i + 1)] = a;
    } else {
      temp[i] = b;
      temp[l - (i + 1)] = a;
    }
    i++;
  }
  return temp;
}

const tags = computed(() => {
  list.value = $NormalSort($RandomSplit(props.tagList.length, 8));// 获取数据结构
  let temp = props.tagList.sort(function (a, b) {// 重新随机排序
    return Math.random() > .5 ? -1 : 1;
  }).concat();
  return list.value.map((v, k) => {
    // 根据list生成数据结构
    return temp.splice(0, v);
  })
})
</script>
<style lang="less" scoped>
.tag-body {
  // background: #fff;
  display: inline-block;
  margin: auto;
  // padding: 20px 50px;

  &-title {
    text-align: center;
    margin-top: 50px;
  }

  &-tags {
    text-align: center;
    word-break: break-word;

    &-li {
      text-align: center;
    }
  }
}
</style>