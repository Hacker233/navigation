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

// 获取热门网站
export const getHotWebsite = (params) => {
  return axiosService({
    url: "/api/recommend/getHotWebsite",
    method: "get",
    params,
  });
}

// 添加热门网站
export const addHotWebsite = (data) => {
  return axiosService({
    url: "/api/recommend/addHotWebsite",
    method: "put",
    data,
  });
}

// 删除热门网站
export const deleteHotWebsite = (data) => {
  return axiosService({
    url: "/api/recommend/deleteHotWebsite",
    method: "put",
    data,
  });
}

// 获取热门资源
export const getHotSource = (params) => {
  return axiosService({
    url: "/api/recommend/getHotSource",
    method: "get",
    params,
  });
}

// 添加热门资源
export const addHotSource = (data) => {
  return axiosService({
    url: "/api/recommend/addHotSource",
    method: "put",
    data,
  });
}

// 删除热门资源
export const deleteHotSource = (data) => {
  return axiosService({
    url: "/api/recommend/deleteHotSource",
    method: "put",
    data,
  });
}