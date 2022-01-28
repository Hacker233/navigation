import axiosService from "../index";
// 新增资源
export const addSource = (data) => {
  return axiosService({
    url: "/api/source/addSource",
    method: "post",
    data,
  });
};
// 查询资源
export const querySourceAll = (params) => {
  return axiosService({
    url: "/api/source/querySourceAll",
    method: "get",
    params,
  });
};
// 更新资源
export const updateSource = (data) => {
  return axiosService({
    url: "/api/source/updateSource",
    method: "put",
    data,
  });
};

// 删除资源
export const deleteSource = (params) => {
  return axiosService({
    url: "/api/source/deleteSource",
    method: "delete",
    params,
  });
};

// 查询所有资源
export const querySourceAllNoPage = (params) => {
  return axiosService({
    url: "/api/source/querySourceAllNoPage",
    method: "get",
    params,
  });
};
