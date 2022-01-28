import axiosService from "../index";
// 添加今日推荐
export const addRecommendToday = (data) => {
  return axiosService({
    url: "/api/recommend/addRecommendToday",
    method: "post",
    data,
  });
};

// 获取今日推荐
export const getRecommendToday = (params) => {
  return axiosService({
    url: "/api/recommend/getRecommendToday",
    method: "get",
    params,
  });
};

// 删除今日推荐
export const deleteRecommendToday = (params) => {
  return axiosService({
    url: "/api/recommend/deleteRecommendToday",
    method: "delete",
    params,
  });
};