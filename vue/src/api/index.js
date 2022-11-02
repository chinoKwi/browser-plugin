// 配置 axios
import axios from "axios";

const instance = axios.create({
  timeout: 5000,
  // baseURL: "https://",
});

instance.interceptors.response.use(
  (config) => {
    if (config.data.meta.status !== 200) {
      window.$message.error(config.data.meta.msg);
    }
    return config.data;
  },
  (error) => {
    window.$message.error("服务器思考中,请稍后再试试~");
    return error;
  }
);

export default instance;
