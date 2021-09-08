import router from "@/router/index";
import login from "../common/LoginDialog"; // 登录弹窗
// 路由前置守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token || !to.meta.auth) {
    next();
  } else {
    if (to.path === "/") {
      next();
    } else {
      login.install();
    }
  }
});
