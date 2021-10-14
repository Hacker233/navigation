import axiosService from "../index";
// 获取所有文章分类
export const getCategory = (params) => {
  return axiosService({
    url: "/api/category/getCategory",
    method: "get",
    params,
  });
};
// 新增文章分类
export const addCategory = (data) => {
  return axiosService({
    url: "/api/category/addCategory",
    method: "post",
    data,
  });
};
// 更新单个分类
export const updateCategory = (data) => {
  return axiosService({
    url: "/api/category/updateCategory",
    method: "put",
    data,
  });
};

// 删除分类
export const deleteCategory = (params) => {
  return axiosService({
    url: "/api/category/deleteCategory",
    method: "delete",
    params,
  });
};