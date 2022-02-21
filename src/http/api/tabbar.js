import axiosService from "../index";
// 添加tabbar
export const addTabbar = (data) => {
  return axiosService({
    url: "/api/tabbar/addTabbar",
    method: "post",
    data,
  });
};
// 查询tabbar
export const getTabbar = (params) => {
  return axiosService({
    url: "/api/tabbar/getTabbar",
    method: "get",
    params,
  });
};

// 删除tabbar
export const deleteTabbar = (params) => {
  return axiosService({
    url: "/api/tabbar/deleteTabbar",
    method: "delete",
    params,
  });
};

// 更新tabbar
export const updateTabbar = (data) => {
  return axiosService({
    url: "/api/tabbar/updateTabbar",
    method: "put",
    data,
  });
};