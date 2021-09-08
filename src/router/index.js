import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue"); // 首页
const Movie = () => import("@/views/movie/index.vue"); // 影视导航
const IframeWeb = () => import("@/components/IframeWeb/IframeWeb.vue"); // 内嵌网页
const Admin = () => import("@/views/admin/index.vue"); // 管理菜单
const MenuManage = () => import("@/views/admin/menumanage/menuManage.vue"); // 菜单管理
const WebsiteManage = () =>
  import("@/views/admin/websiteManage/websiteManage.vue"); // 网站管理

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
    meta: {
      showRightTitle: true,
    },
  },
  // 影视导航
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    meta: {
      activeMenu: "/movie",
      showRightTitle: true,
    },
  },
  //影视内嵌网页
  {
    path: "/moviewweb",
    name: "moviewweb",
    component: IframeWeb,
    meta: {
      activeMenu: "/movie",
      showRightTitle: false,
    },
  },
  // 管理菜单
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      activeMenu: "/admin",
      showRightTitle: true,
    },
    children: [
      // 菜单管理
      {
        path: "menumanage",
        name: "menumanage",
        component: MenuManage,
        meta: {
          activeMenu: "/admin/menumanage",
          showRightTitle: true,
        },
      },
      {
        path: "websitemanage",
        name: "websitemanage",
        component: WebsiteManage,
        meta: {
          activeMenu: "/admin/websitemanage",
          showRightTitle: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
