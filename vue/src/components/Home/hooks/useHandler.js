import { GetBg } from "../../../api/user";
import { img_info } from "./useData";
// 加载壁纸
export const load_bg = async () => {
  const res = await GetBg();
  if (res.meta.status !== 200) return;
  img_info.value = {}; // res.data
  if (!img_info.value.url) {
    remove_loading();
    return window.$message.info("请将应用返回数据格式设置为JSON");
  }
  render_img();
};

// 渲染IMG
const render_img = () => {
  const ele = document.createElement("img");
  ele.src = img_info.value.url;
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
