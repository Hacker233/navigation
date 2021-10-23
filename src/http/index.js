import axios from "axios";
import env from "../config/index";
import store from "../store";
import { Message } from "element-ui";

// 创建一个axios实例
const axiosService = axios.create({
  baseURL: env.serverAddress, // url = base url + request url
  timeout: 20000, // 设置超时时间为5s
  headers: {
    dataType: "application/json",
  },
});

// 将token加在headers上
axiosService.interceptors.request.use(
  (config) => {
    // 设置请求类型
    config.headers["Content-Type"] = config.headers["dataType"];
    if (env.useTokenAuthentication && localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
      return Promise.resolve(config);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 处理请求content-type
axiosService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 处理请求错误
    Promise.reject(error);
  }
);

// respone拦截器 ==> 对响应做处理
axiosService.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.code === "T0001") {
        localStorage.removeItem("token");
        location.reload();
      } else {
        // 存储token到本地
        const token = response.headers.authorization;
        if (token) {
          store.commit("setAuthorization", token);
        }
      }
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    let err = error.response;
    if (!err) {
      Message.error("网络连接失败！");
    } else {
      return Promise.reject(error.response.status);
    }
  }
);

// 将写好的axios实例暴露出去
export default axiosService;

