<template>
  <div class="showTime">{{ nowTime.h }}:{{ nowTime.m }}</div>
</template>
<script setup>
import { ref } from "vue";
import dayjs from "dayjs";

const nowTime = ref({
  h: "12",
  m: "12",
});

setInterval(() => {
  const now = dayjs().format("HH-mm");
  const now_arr = now.split("-");
  nowTime.value.h = now_arr[0];
  nowTime.value.m = now_arr[1];
}, 800);
</script>
<style lang="less" scoped>
.showTime {
  position: absolute;
  right: 50px;
  top: 30px;
  font-size: 78px;
  font-weight: 300;
  color: rgb(255, 255, 255);
  display: inline-flex;
}
</style>
