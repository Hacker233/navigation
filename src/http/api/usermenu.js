import axiosService from "../index";
// 获取菜单
export const getUsermenu = (params) => {
  return axiosService({
    url: "/person/getUsermenu",
    method: "get",
    params,
  });
};
// 新增菜单
export const addUsermenu = (data) => {
  return axiosService({
    url: "/person/addUsermenu",
    method: "post",
    data,
  });
};
