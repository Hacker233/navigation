import Vue from "vue";
import Vuex from "vuex";
import { getMenu } from "@/http/api/menu"; // 请求菜单接口
import { getUserInfo } from "@/http/api/user"; // 请求用户信息
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [],
    // token
    token: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false,
    // 用户信息
    userInfo: "",
  },
  getters: {
    token: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
  mutations: {
    setMenuList(state, menuList) {
      state.menuList = menuList;
    },
    // 修改token，并将token存入本地
    setAuthorization(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    // 获取用户信息后存储下来
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {
    async getMenu(context) {
      const data = await getMenu();
      let menuList = [];
      if (data.code === "00000") {
        menuList = data.data;
        context.commit("setMenuList", menuList);
      } else {
        this.$Message.error(data.message);
      }
    },
    // 查询用户信息
    async getUserInfo(context) {
      let userInfo = [];
      const data = await getUserInfo();
      if (data.code === "00000") {
        userInfo = data.data;
        context.commit("setUserInfo", userInfo);
      } else {
        this.$Message.error(data.message);
      }
    },
  },
  modules: {},
});
