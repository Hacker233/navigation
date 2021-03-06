import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./styles.scss";
import "@/styles/normalize.css";
import login from "./common/LoginDialog"; // 登录弹窗全局组件
import "./common/auth"; // 权限检测
import "viewerjs/dist/viewer.css"; // 图片预览
import Viewer from "v-viewer";
import "nprogress/nprogress.css";

Vue.use(Viewer);
Vue.use(ElementUI);
console.log(process);
Vue.config.productionTip = false;
Vue.prototype.$login = login.install;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
