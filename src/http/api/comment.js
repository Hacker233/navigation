import axiosService from "../index";
// 获取评论列表
export const getCommentList = (params) => {
  return axiosService.get("/comment/commentList", { params });
};
// 发表评论
export const addComment = (data) => {
  return axiosService.post("/comment/addComment", data);
};
