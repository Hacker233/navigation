import Vue from "vue";
import Vuex from "vuex";
import { getMenu } from "@/http/api/menu"; // 请求菜单接口
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [],
  },
  mutations: {
    setMenuList(state, menuList) {
      state.menuList = menuList;
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
  },
  modules: {},
});
