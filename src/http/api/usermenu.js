import axiosService from "../index";
// 获取菜单
export const getUsermenu = (params) => {
  return axiosService({
    url: "/api/person/getUsermenu",
    method: "get",
    params,
  });
};
// 新增菜单
export const addUsermenu = (data) => {
  return axiosService({
    url: "/api/person/addUsermenu",
    method: "post",
    data,
  });
};
// 删除菜单
export const deleteUsermenu = (params) => {
  return axiosService({
    url: "/api/person/deleteUsermenu",
    method: "delete",
    params,
  });
};
// 更新菜单
export const updateUsermenu = (data) => {
  return axiosService({
    url: "/api/person/updateUsermenu",
    method: "put",
    data,
  });
};
