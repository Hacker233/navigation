import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue"); // 首页
const Movie = () => import("@/views/movie/index.vue"); // 影视导航
const Admin = () => import("@/views/admin/index.vue"); // 管理菜单
const MenuManage = () => import("@/views/admin/menumanage/menuManage.vue"); // 菜单管理

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
  },
  // 影视导航
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    meta: {
      activeMenu: "/movie",
    },
  },
  // 管理菜单
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      activeMenu: "/admin",
    },
    children: [
      {
        path: "menumanage",
        name: "menumanage",
        component: MenuManage,
        meta: {
          activeMenu: "/admin/menumanage",
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
