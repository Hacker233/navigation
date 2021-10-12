import axiosService from "../index";
// 获取菜单
export const getTopmenu = (params) => {
  return axiosService({
    url: "/api/topmenu/getTopmenu",
    method: "get",
    params,
  });
};
// 新增一级菜单
export const addMenu = (data) => {
  return axiosService({
    url: "/api/topmenu/addTopmenu",
    method: "post",
    data,
  });
};
// 添加二级菜单
export const addSubMenu = (data) => {
  return axiosService({
    url: "/api/topmenu/addSubTopmenu",
    method: "post",
    data,
  });
};
// 删除菜单
export const deleteMenu = (params) => {
  return axiosService({
    url: "/api/topmenu/deleteTopmenu",
    method: "delete",
    params,
  });
};
// 修改菜单
export const updateMenu = (data) => {
  return axiosService({
    url: "/api/topmenu/updateTopmenu",
    method: "put",
    data,
  });
};
