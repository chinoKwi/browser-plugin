// 配置 axios
import axios from "axios";

const instance = axios.create({
  timeout: 5000,
  // baseURL: "https://",
});

instance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    console.log("响应出错", error);
    return error;
  }
);

export default instance;
