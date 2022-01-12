import axiosService from "../index";
// 新增轮播
export const addCarsouel = (data) => {
  return axiosService({
    url: "/api/carsouel/addCarsouel",
    method: "post",
    data,
  });
};
