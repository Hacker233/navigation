import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue"); // 首页
const WebSite = () => import("@/views/website/index.vue"); // 导航页面
const IframeWeb = () => import("@/components/IframeWeb/IframeWeb.vue"); // 内嵌网页
const Person = () => import("@/views/person/index.vue"); // 个人中心

/**************管理员操作菜单******************/
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
      showBack: false,
      auth: false,
    },
  },
  // 个人中心
  {
    path: "/person",
    name: "person",
    component: Person,
    meta: {
      showRightTitle: true,
      showBack: true,
      auth: true,
    },
  },
  // 影视导航
  {
    path: "/movie",
    name: "movie",
    component: WebSite,
    meta: {
      activeMenu: "/movie", // 激活哪个菜单
      showRightTitle: true, // 是否显示右侧顶部栏
      showBack: false,
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
      showBack: false,
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
      showBack: false,
      auth: false,
    },
  },
  //影视内嵌网页
  {
    path: "/iframewweb",
    name: "iframewweb",
    component: IframeWeb,
    meta: {
      showRightTitle: true,
      showBack: true,
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
      showBack: false,
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
          showBack: false,
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
          showBack: false,
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
          showBack: false,
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
