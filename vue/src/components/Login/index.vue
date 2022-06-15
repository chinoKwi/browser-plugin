<template>
  <a-button
    type="primary"
    class="login_btn"
    @click="login_dialog_visible = true"
    >Primary Button</a-button
  >
  <Modal v-model:visible="login_dialog_visible" title="登 录">
    <!-- 登录表单 -->
    <Spin :spinning="loading"> </Spin>
    <!-- 尾部 -->
    <template #footer>
      <a-button :loading="loading">关闭</a-button>
      <a-button type="primary" :loading="loading">登录</a-button>
    </template>
  </Modal>
</template>
<script setup>
import { Modal, Spin } from "ant-design-vue";
import { login_dialog_visible, loading } from "./hooks/useData";
</script>
<style lang="less" scoped>
.login_btn {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
