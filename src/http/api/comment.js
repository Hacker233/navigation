import axiosService from "../index";
// 获取评论列表
export const getCommentList = (params) => {
  return axiosService.get("/api/comment/commentList", { params });
};
// 发表评论
export const addComment = (data) => {
  return axiosService.post("/api/comment/addComment", data);
};
