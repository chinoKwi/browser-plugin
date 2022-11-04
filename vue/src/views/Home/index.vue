<template>
  <div class="main">
    <!-- 背景组件 -->
    <BackGround />
    <div class="main-content">
      <div class="config-area">
        <Tooltip
          placement="top"
          title="用户中心"
          :get-popup-container="getPopupContainer"
        >
          <UserOutlined class="item" @click="loginRef.openModal()" />
        </Tooltip>
        <Tooltip
          placement="top"
          title="应用列表"
          :get-popup-container="getPopupContainer"
        >
          <AppstoreOutlined class="item" @click="appListRef.openModal()" />
        </Tooltip>
      </div>
      <!-- 时间部分 -->
      <ShowTime />
    </div>
  </div>
  <!-- 弹框部分 -->
  <Login ref="loginRef" />
  <AppList ref="appListRef" />
</template>
<script setup>
import { ref } from "vue";
import { Tooltip } from "ant-design-vue";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons-vue";
import { LoadBg } from "./hooks/useHandler";
import Login from "../../components/Login/index.vue";
import AppList from "../../components/AppList/index.vue";
import BackGround from "./components/BackGround.vue";
import ShowTime from "./components/ShowTime.vue";

const loginRef = ref(null);
const appListRef = ref(null);

const getPopupContainer = (trigger) => {
  return trigger.parentElement;
};

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
  .config-area {
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 200px;
    height: 30px;
    // background-color: aqua;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    .item {
      cursor: pointer;
      font-size: 20px;
      color: #fff;
      margin-right: 20px;
    }
  }
}
</style>
