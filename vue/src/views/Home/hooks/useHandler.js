import { GetBg } from "../../../api/user";
import { ImgInfo } from "./useData";
// 加载壁纸
export const LoadBg = async () => {
  // 判断是否登陆了 判断是否选择了APPID
  const userToken =
    window.localStorage.getItem("userToken") ||
    (await chrome.storage.sync.get({ userToken: "" }).userToken);
  if (!userToken) {
    window.$message.info("请先登陆");
    remove_loading();
    return;
  }
  let appid =
    window.localStorage.getItem("apiAppId") ||
    (await chrome.storage.sync.get({ apiAppId: "" }).apiAppId);
  if (!appid) {
    window.$message.info("请选择需要使用的应用");
    remove_loading();
    return;
  }

  const res = await GetBg();
  if (res.meta.status !== 200) return remove_loading();
  ImgInfo.value = res.data;
  if (!ImgInfo.value.url) {
    remove_loading();
    return window.$message.info("请将应用返回数据格式设置为JSON");
  }
  render_img();
};

// 渲染IMG
const render_img = () => {
  const ele = document.createElement("img");
  ele.src = ImgInfo.value.url;
  document.body.append(ele);
  ele.onload = function () {
    remove_loading();
    ele.remove();
  };
  ele.onerror = function () {
    window.$message.error("图片加载失败");
  };
};

// 移除首页Loading
export const remove_loading = () => {
  if (document.getElementById("loading_warp")) {
    document.getElementById("loading_warp").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("loading_warp").remove();
    }, 1000);
  }
};
