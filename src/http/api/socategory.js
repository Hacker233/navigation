import axiosService from "../index";
// 新增资源分类
export const addSocategory = (data) => {
  return axiosService({
    url: "/api/source/addSocategory",
    method: "post",
    data,
  });
};

// 查询所有资源分类
export const querySocategoryAll = (params) => {
  return axiosService({
    url: "/api/source/querySocategoryAll",
    method: "get",
    params,
  });
};

// 更新资源分类
export const updateSocategory = (data) => {
  return axiosService({
    url: "/api/source/updateSocategory",
    method: "put",
    data,
  });
};

// 删除文章分类
export const deleteSocategory = (params) => {
  return axiosService({
    url: "/api/source/deleteSocategory",
    method: "delete",
    params,
  });
};
