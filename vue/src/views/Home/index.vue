<template>
  <div class="main">
    <!-- 背景组件 -->
    <BackGround />
    <div class="main-content">
      <!-- 时间部分 -->
      <ShowTime />
      <!-- 拖拽部分 -->
      <MostVisited />
      <!-- 登录组件 -->
      <Login />
      <AppList />
    </div>
  </div>
</template>
<script setup>
import { LoadBg } from "./hooks/useHandler";
import Login from "../../components/Login/index.vue";
import AppList from "../../components/AppList/index.vue";
import BackGround from "./components/BackGround.vue";
import ShowTime from "./components/ShowTime.vue";
import MostVisited from "./components/MostVisited.vue";

LoadBg();
</script>
<style lang="less" scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
}
.main-content {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
}
</style>
