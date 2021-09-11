import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue"); // 首页

const WebSite = ()=> import("@/views/website/index.vue"); // 导航页面

const IframeWeb = () => import("@/components/IframeWeb/IframeWeb.vue"); // 内嵌网页
const Admin = () => import("@/views/admin/index.vue"); // 管理菜单
const MenuManage = () => import("@/views/admin/menumanage/menuManage.vue"); // 菜单管理
const WebsiteManage = () =>
  import("@/views/admin/websiteManage/websiteManage.vue"); // 网站管理
const UserManage = () => import("@/views/admin/usermanage/usermanage.vue"); // 用户管理

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
    meta: {
      showRightTitle: true,
      auth: false,
    },
  },
  // 影视导航
  {
    path: "/movie",
    name: "movie",
    component: WebSite,
    meta: {
      activeMenu: "/movie",
      showRightTitle: true,
      auth: false,
    },
  },
  // 书籍导航
  {
    path: "/book",
    name: "book",
    component: WebSite,
    meta: {
      activeMenu: "/book",
      showRightTitle: true,
      auth: false,
    },
  },
  // 编程导航
  {
    path: "/program",
    name: "program",
    component: WebSite,
    meta: {
      activeMenu: "/program",
      showRightTitle: true,
      auth: false,
    },
  },
  //影视内嵌网页
  {
    path: "/iframewweb",
    name: "iframewweb",
    component: IframeWeb,
    meta: {
      // activeMenu: "/movie",
      showRightTitle: false,
      auth: false,
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
      auth: true,
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
          auth: true,
        },
      },
      // 网站管理
      {
        path: "websitemanage",
        name: "websitemanage",
        component: WebsiteManage,
        meta: {
          activeMenu: "/admin/websitemanage",
          showRightTitle: true,
          auth: true,
        },
      },
      // 用户管理
      {
        path: "usermanage",
        name: "usermanage",
        component: UserManage,
        meta: {
          activeMenu: "/admin/usermanage",
          showRightTitle: true,
          auth: true,
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
