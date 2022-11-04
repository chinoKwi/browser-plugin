<template>
  <div class="main">
    <!-- 背景组件 -->
    <BackGround />
    <!-- 时间部分 -->
    <ShowTime />
    <!-- 拖拽部分 -->
    <MostVisited />
    <!-- 登录组件 -->
    <Login />
    <AppList />
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
</style>
