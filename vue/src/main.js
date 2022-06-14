import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/css/common.css";

import "ant-design-vue/dist/antd.css";

import { message, Button } from "ant-design-vue";
window.$message = message;

const app = createApp(App).use(store);
app.component(Button.name, Button);

app.mount("#app");
