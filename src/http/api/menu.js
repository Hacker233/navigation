import axiosService from "../index";
// 获取菜单
export const getMenu = (params) => {
  return axiosService({
    url: "/menu/getMenu",
    method: "get",
    params,
  });
};
// 新增一级菜单
export const addMenu = (data) => {
  return axiosService({
    url: "/menu/addMenu",
    method: "post",
    data,
  });
};
// 添加二级菜单
export const addSubMenu = (data) => {
  return axiosService({
    url: "/menu/addSubMenu",
    method: "post",
    data,
  });
};
// 删除菜单
export const deleteMenu = (params) => {
  return axiosService({
    url: "/menu/deleteMenu",
    method: "delete",
    params,
  });
};
// 修改菜单
export const updateMenu = (data) => {
  return axiosService({
    url: "/menu/updateMenu",
    method: "put",
    data,
  });
};
