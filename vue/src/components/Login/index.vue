<template>
  <a-button
    type="primary"
    class="login_btn"
    @click="login_dialog_visible = true"
    >Primary Button</a-button
  >
  <Modal title="登 陆" v-model:visible="login_dialog_visible" :footer="null">
    <!-- 登录表单 -->
    <Spin :spinning="loading">
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
          <Input
            v-model:value="form_data.password"
            placeholder="请输入登陆密码"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </Input>
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
    </Spin>
  </Modal>
</template>
<script setup>
import { Modal, Spin, Form, FormItem, Input, Button } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login_dialog_visible, loading, form_data } from "./hooks/useData";
import { Login } from "@/api/user";

const onFinish = async (values) => {
  const res = await Login(values);
  if (res.meta.status !== 200) return;
  // 存储 token
  login_dialog_visible.value = false;
  console.log("Success:", res);
};
</script>
<style lang="less" scoped>
.login_btn {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
