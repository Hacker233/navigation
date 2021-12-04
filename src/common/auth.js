import router from "@/router/index";
import login from "../common/LoginDialog"; // 登录弹窗
// 路由前置守卫
router.beforeEach((to, from, next) => {
  if (to.path) {
    window._hmt.push(['_trackPageview', to.fullPath]);
  }
  let token = localStorage.getItem("token");
  if (token || !to.meta.auth) {
    next();
  } else {
    if (to.path === "/") {
      next();
    } else {
      login.install({
        login: (data) => {
          if (data) {
            location.reload();
          }
        },
        register: (data) => {
          if (data) {
            location.reload();
          }
        },
      });
    }
  }
});
