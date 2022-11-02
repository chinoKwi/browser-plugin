import instance from "./index";

const baseUrl = "https://api.kafuuchino.top";

export const Login = (params) => {
  return instance.post(`${baseUrl}/user/login`, {
    ischooes: true,
    useremail: params.email,
    password: params.password,
  });
};

export const GetBg = () => {
  return instance.get("https://rabbit-api.com");
};
