<template>
  <div class="back_ground">
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
</template>
<script setup>
import { ImgInfo } from "../hooks/useData";
</script>
<style lang="less" scoped>
.back_ground {
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
