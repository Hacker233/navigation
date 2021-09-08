import axiosService from "../index";
// 登录
export const userLogin = (data) => {
  return axiosService.post("/user/login", data);
};

// 注册用户
export const userRegister = (data) => {
  return axiosService.post("/user/register", data);
};

// 查询用户信息
export const getUserInfo = () => {
  return axiosService.get("/user/userInfo");
};

// 获取邮箱验证码
export const emailCode = (data) => {
  return axiosService.post("/user/emailCode", data);
};
