import axiosService from "../index";
export const getMenu = (params) => {
  return axiosService({
    url: "/menu/getMenu",
    method: "get",
    params,
  });
};
