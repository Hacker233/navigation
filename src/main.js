import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./styles.scss";
import "@/styles/normalize.css";
import login from "./common/LoginDialog"; // 登录弹窗全局组件
import "./common/auth"; // 权限检测

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$login = login.install;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
