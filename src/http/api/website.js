import axiosService from "../index";
// 新增网站
export const addWebsite = (data) => {
  return axiosService({
    url: "/api/website/addWebsite",
    method: "post",
    data,
  });
};
// 查询网站
export const queryWebsite = (params) => {
  return axiosService({
    url: "/api/website/queryWebsite",
    method: "get",
    params,
  });
};

// 查询当前菜单的分类列表
export const queryCategory = (params) => {
  return axiosService({
    url: "/api/website/queryCategory",
    method: "get",
    params,
  });
};
// 删除网站
export const deleteWebsite = (params) => {
  return axiosService({
    url: "/api/website/deleteWebsite",
    method: "delete",
    params,
  });
};

// 更新站点
export const updataWebsite = (data) => {
  return axiosService({
    url: "/api/website/updataWebsite",
    method: "put",
    data,
  });
};

// 点击菜单查询网站
export const queryMenuWebsite = (params) => {
  return axiosService({
    url: "/api/website/queryMenuWebsite",
    method: "get",
    params,
  });
};
