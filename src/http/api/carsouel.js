import axiosService from "../index";
// 新增轮播
export const addCarsouel = (data) => {
  return axiosService({
    url: "/api/carsouel/addCarsouel",
    method: "post",
    data,
  });
};

// 查询所有轮播图
export const getAllCarsouel = (params) => {
  return axiosService({
    url: "/api/carsouel/getAllCarsouel",
    method: "get",
    params,
  });
};

// 更新轮播图
export const updateCarsouel = (data) => {
  return axiosService({
    url: "/api/carsouel/updateCarsouel",
    method: "put",
    data,
  });
}

// 删除轮播
export const deleteCarsouel = (params) => {
  return axiosService({
    url: "/api/carsouel/deleteCarsouel",
    method: "delete",
    params,
  });
}