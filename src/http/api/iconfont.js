import axiosService from "../index";
// 新增图标
export const addIconfont = (data) => {
  return axiosService({
    url: "/iconfont/addIconfont",
    method: "post",
    data,
  });
};
// 获取所有图标
export const getIconfont = (params) => {
  return axiosService({
    url: "/iconfont/getIconfont",
    method: "get",
    params,
  });
};
// 删除图标
export const deleteIconfont = (params) => {
  return axiosService({
    url: "/iconfont/deleteIconfont",
    method: "delete",
    params,
  });
};
