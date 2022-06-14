<template>
  <a-button type="primary" @click="visible = true">Primary Button</a-button>
  <Modal v-model:visible="visible" title="登录">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
</template>
<script setup>
import { Modal } from "ant-design-vue";
import { visible, loading } from "./hooks/useData";
</script>
