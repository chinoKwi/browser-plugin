import instance from "./index";

const baseUrl = "https://api.kafuuchino.top";

export const Login = (params) => {
  return instance.post(`${baseUrl}/user/login`, {
    ischooes: true,
    useremail: params.email,
    password: params.password,
  });
};

// 获取用户创建的APP列表
export const GetAppList = async () => {
  const token =
    window.localStorage.getItem("userToken") ||
    (await chrome.storage.sync.get({ userToken: "" }).userToken);
  return instance.get(`${baseUrl}/user/get_user_applist`, {
    headers: {
      authorization: token,
    },
  });
};

export const GetBg = async () => {
  let appid =
    window.localStorage.getItem("apiAppId") ||
    (await chrome.storage.sync.get({ apiAppId: "" }).apiAppId);
  let token =
    window.localStorage.getItem("apiToken") ||
    (await chrome.storage.sync.get({ apiToken: "" }).apiToken);

  return instance.get("https://rabbit-api.com", {
    params: {
      appid,
      token,
    },
  });
};
