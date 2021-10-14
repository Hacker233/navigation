import axiosService from "../index";
// 发布文章
export const publishArticle = (data) => {
  return axiosService({
    url: "/api/article/publishArticle",
    method: "post",
    data,
  });
};
// 获取所有文章分类
export const getCategory = (params) => {
  return axiosService({
    url: "/api/category/getcategory",
    method: "get",
    params,
  });
};
// 根据id获取文章内容
export const getArticle = (params) => {
  return axiosService({
    url: "/api/article/getArticle",
    method: "get",
    params,
  });
}
