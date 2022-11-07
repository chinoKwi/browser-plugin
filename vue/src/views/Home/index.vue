<template>
  <div class="main">
    <!-- 背景组件 -->
    <BackGround />
    <div class="main-content">
      <!-- 左上角 Tag 部分 -->
      <div class="tags-area">
        <TagList v-if="ImgInfo.tag?.length" :tagList="ImgInfo.tag" />
      </div>
      <!-- 左下角 图片作者信息 -->
      <div class="painter-area">
        <!-- target="_blank" -->
        插画由&nbsp;<a href="javascript:" class="link">{{
            ImgInfo.imgauthor
        }}</a>
      </div>
      <!-- 右下角 配置信息 -->
      <div class="config-area">
        <Tooltip placement="top" title="用户中心" :get-popup-container="getPopupContainer">
          <UserOutlined class="item" @click="loginRef.openModal()" />
        </Tooltip>
        <Tooltip placement="top" title="应用列表" :get-popup-container="getPopupContainer">
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
import { ref, watch } from "vue";
import { Tooltip } from "ant-design-vue";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons-vue";
import { LoadBg } from "./hooks/useHandler";
import Login from "../../components/Login/index.vue";
import AppList from "../../components/AppList/index.vue";
import BackGround from "./components/BackGround.vue";
import ShowTime from "./components/ShowTime.vue";
import TagList from './components/TagList.vue'
import { ImgInfo } from "./hooks/useData";

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

  .painter-area {
    position: absolute;
    left: 30px;
    bottom: 30px;
    // width: 200px;
    height: 30px;
    // background-color: aqua;

    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;

    .link {
      text-decoration: none;
      transition: color 0.15s ease 0s;
      color: rgba(255, 255, 255, 0.6);
    }

    .link:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .tags-area {
    position: absolute;
    left: 30px;
    top: 10px;
    // width: 200px;
    height: 30px;
    // background-color: aqua;

    // display: flex;
    // align-items: center;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;

    .link {
      cursor: pointer;
      display: inline-block;
      margin: 5px 5px;
      text-decoration: none;
      transition: color 0.15s ease 0s;
      color: rgba(255, 255, 255, 0.6);
    }

    .link:hover {
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>
