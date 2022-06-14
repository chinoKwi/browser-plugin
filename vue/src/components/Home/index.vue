<template>
  <!-- 背景部分 -->
  <div class="new_tab_box">
    <!-- 壁纸 -->
    <div class="bg_wrap">
      <div
        class="bg_image"
        :style="{
          'background-image': `url(${ImgInfo.url ? ImgInfo.url : ''})`,
        }"
      ></div>
    </div>
  </div>
  <!-- 时间部分 -->
  <div class="show_time_box"></div>
  <!-- 拖拽部分 -->
  <!-- <Login style="position: absolute; z-index: 10" /> -->
</template>
<script setup>
import { onMounted } from "vue";
import { LoadBg } from "./hooks/useHandler";
import { ImgInfo } from "./hooks/useData";
import Login from "../Login/index.vue";

onMounted(() => {
  LoadBg();
});
</script>
<style lang="less" scoped>
.new_tab_box {
  height: 100vh;
  width: 100vw;
  .bg_wrap {
    user-select: none;
    animation-fill-mode: none !important;
    .bg_image {
      filter: blur(0px);
      transform: scale(1);
      position: absolute;
      display: block;
      object-fit: cover;
      opacity: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.4s;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      transition-timing-function: ease;
    }
  }
}
</style>
