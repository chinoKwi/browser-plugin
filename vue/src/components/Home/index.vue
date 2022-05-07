<template>
  <div id="root_preload"></div>
  <div class="new_tab_box">
    <!-- 壁纸 -->
    <div class="bg_wrap">
      <div
        class="bg_image"
        :style="{
          'background-image': `url(${img_info.url ? img_info.url : ''})`,
        }"
      ></div>
      <div class="cover"></div>
    </div>
  </div>
  <img
    id="img_bg"
    ref="imgBgRefCom"
    style="display: none"
    :src="img_info.url ? img_info.url : ''"
  />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { load_bg } from "./hooks/useHandler";
import { img_info, imgBgRef } from "./hooks/useData";
const imgBgRefCom = ref();

onMounted(() => {
  imgBgRef.value = imgBgRefCom;
  load_bg();
});
</script>
<style lang="less" scoped>
#root_preload {
  background-color: #fff;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.new_tab_box {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
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
    .cover {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }
  }
}
</style>
