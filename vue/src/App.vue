<template>
  <Home />
</template>

<script setup>
import { onMounted } from "vue";
import Home from "./components/Home/index.vue";

onMounted(() => {
  if (document.getElementById("loading_warp")) {
    document.getElementById("loading_warp").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loading_warp").remove();
    }, 1000);
  }
});
</script>
