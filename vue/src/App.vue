<template>
  <ConfigProvider :locale="zhCN">
    <Home />
  </ConfigProvider>
</template>

<script setup>
import { ConfigProvider } from "ant-design-vue";
import Home from "./views/Home/index.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
</script>
