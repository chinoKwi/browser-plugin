import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'ant-design-vue/dist/antd.css';

import { message } from 'ant-design-vue';
window.$message = message

const app = createApp(App).use(store)

app.mount('#app')
