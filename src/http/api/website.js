import axiosService from "../index";
// 新增网站
export const addWebsite = (data) => {
  return axiosService({
    url: "/website/addWebsite",
    method: "post",
    data,
  });
};
// 查询网站
export const queryWebsite = (params) => {
  return axiosService({
    url: "/website/queryWebsite",
    method: "get",
    params,
  });
};
