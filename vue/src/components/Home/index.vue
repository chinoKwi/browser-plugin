<template>
  <!-- 背景组件 -->
  <BackGround />
  <!-- 时间部分 -->
  <ShowTime />
  <!-- 拖拽部分 -->
  <MostVisited />
  <!-- 登录组件 -->
  <Login />
</template>
<script setup>
import { LoadBg } from "./hooks/useHandler";
import Login from "../Login/index.vue";
import BackGround from "./components/BackGround.vue";
import ShowTime from "./components/ShowTime.vue";
import MostVisited from "./components/MostVisited.vue";

LoadBg();
</script>
