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
// 删除菜单
export const deleteMenu = (params) => {
  return axiosService({
    url: "/menu/deleteMenu",
    method: "delete",
    params
  })
}
