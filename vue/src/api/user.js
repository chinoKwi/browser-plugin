import instance from "./index";
export const GetBg = () => {
  return instance.get("https://rabbit-api.com");
};
