import axiosService from "../index";
// 发布文章
export const publishArticle = (data) => {
  return axiosService({
    url: "/api/article/publishArticle",
    method: "post",
    data,
  });
};
