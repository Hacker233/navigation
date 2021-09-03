import axios from "axios";
import CONFIG from "../config/index";
import { LoadingBar, Message } from "element-ui";

const axiosService = axios.create({
  baseURL: CONFIG.serverAddress,
  timeout: 20000,
});
axiosService.interceptors.use(
  (req) => {
    LoadingBar.start();
    return Promise.resolve(req);
  },
  (err) => {
    return Promise.reject(err);
  }
);
axiosService.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
axiosService.interceptors.response.use(
  (response) => {
    LoadingBar.finish();
    return response.data;
  },
  (err) => {
    Message.error(err);
    return Promise(err);
  }
);
export default axiosService;
