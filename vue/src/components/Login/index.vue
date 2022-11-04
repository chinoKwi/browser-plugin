<template>
  <Modal title="登 陆" v-model:visible="login_dialog_visible" :footer="null">
    <!-- 登录表单 -->
    <Spin :spinning="loading">
      <template v-if="loginState == false">
        <Form name="loginForm" :model="form_data" @finish="onFinish">
          <!-- 邮箱地址 -->
          <FormItem
            name="email"
            :rules="[
              { required: true, message: '邮箱地址不能为空' },
              { type: 'email', message: '请输入正确的邮箱地址' },
            ]"
          >
            <Input v-model:value="form_data.email" placeholder="请输入邮箱地址">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </Input>
          </FormItem>
          <!-- 密码 -->
          <FormItem
            name="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
          >
            <InputPassword
              v-model:value="form_data.password"
              placeholder="请输入登陆密码"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </InputPassword>
          </FormItem>
          <!-- 登陆按钮 -->
          <FormItem>
            <Button
              style="width: 100%"
              type="primary"
              html-type="submit"
              :loading="loading"
              >登陆</Button
            >
          </FormItem>
        </Form>
      </template>
      <template v-else>
        <p>
          Hello!<a-button type="link">{{ userNickName }}</a-button
          >您已登陆!
        </p>
        <a-button type="danger" @click="onLoginOut">
          <template #icon>
            <LoginOutlined />
          </template>
          退出登陆
        </a-button>
      </template>
    </Spin>
  </Modal>
</template>
<script setup>
import { ref } from "vue";
import {
  Modal,
  Spin,
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
} from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import { login_dialog_visible, loading, form_data } from "./hooks/useData";
import { Login } from "@/api/user";

const loginState = ref(false);
const userNickName = ref("");

const onFinish = async (values) => {
  const res = await Login(values);
  if (res.meta.status !== 200) return;
  // 存储 token
  login_dialog_visible.value = false;

  // uid username token sign
  window.localStorage.setItem("userToken", res.data.token);
  window.localStorage.setItem("userName", res.data.username);
  chrome.storage.sync.set({
    userToken: res.data.token,
    userName: res.data.username,
  });
  isLogin();
  getUserNickName();
  // const data = await chrome.storage.sync.get({ userToken: "" });
  // console.log("data", data);
};

const onLoginOut = async () => {
  loading.value = true;
  window.localStorage.clear();
  await chrome.storage.sync.clear();
  loading.value = false;
  window.$message.success("已退出登陆");
  isLogin();
};

// 判断是否登陆
const isLogin = async () => {
  const token =
    window.localStorage.getItem("userToken") ||
    (await chrome.storage.sync.get({ userToken: "" }).userToken);
  console.log("token", token);
  if (token) {
    loginState.value = true;
  } else {
    loginState.value = false;
  }
};

// 获取用户昵称
const getUserNickName = async () => {
  const nickName =
    window.localStorage.getItem("userName") ||
    (await chrome.storage.sync.set({
      userName: "",
    }));
  userNickName.value = nickName;
};

isLogin();
getUserNickName();

defineExpose({
  openModal: function () {
    login_dialog_visible.value = true;
  },
});
</script>
<style lang="less" scoped>
.login_btn {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
