import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue"); // 首页
const WebSite = () => import("@/views/website/index.vue"); // 导航页面
const IframeWeb = () => import("@/components/IframeWeb/IframeWeb.vue"); // 内嵌网页

const Person = () => import("@/views/person/index.vue"); // 个人中心
const PersonData = () => import("@/views/person/components/PersonData.vue"); // 个人资料

const ArticleList = () => import("@/views/articleList/index.vue"); // 文章列表
const Article = () => import("@/views/article/index.vue"); // 文章详情页面

const PublishComplete = () =>
  import("@/views/content/publish/components/PublishComplete.vue"); // 文章发布成功页面

/**************管理员操作菜单******************/
const Admin = () => import("@/views/admin/index.vue"); // 管理菜单
const MenuManage = () => import("@/views/admin/menumanage/menuManage.vue"); // 菜单管理
const WebsiteManage = () =>
  import("@/views/admin/websiteManage/websiteManage.vue"); // 网站管理
const UserManage = () => import("@/views/admin/usermanage/usermanage.vue"); // 用户管理
const PersonMenu = () => import("@/views/admin/personmenu/personmenu.vue"); // 用户菜单管理
const Iconfont = () => import("@/views/admin/iconfont/iconfont.vue"); // 图标管理
const TopMenu = () => import("@/views/admin/topMenu/topmenu.vue"); // 顶部菜单管理

/****************内容管理菜单*****************/
const Content = () => import("@/views/content/index.vue"); // 内容管理菜单
const Publish = () => import("@/views/content/publish/index.vue"); // 发布内容
const Category = () => import("@/views/content/category/index.vue"); // 分类管理
const ArticleManage = () => import("@/views/content/articleManage/index.vue"); // 文章管理

/****************资源管理菜单*****************/
const Source = () => import("@/views/admin/source/source.vue"); // 资源管理
const SourceManage = () =>
  import("@/views/admin/source/sourcemanage/index.vue"); // 资源管理
const SourceCategory = () =>
  import("@/views/admin/source/sourcecategory/index.vue"); // 资源分类

/****************轮播管理菜单*****************/
const Carsouel = () => import("@/views/admin/carsouel/carsouel.vue"); // 轮播管理
const CarsouelManage = () =>
  import("@/views/admin/carsouel/carsouelmanage/index.vue"); // 轮播管理首页

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
    meta: {
      showRightTitle: true, // 是否显示右侧标题
      showBack: false, // 是否显示返回按钮
      auth: false, // 是否需要权限
      keepAlive: false,
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
      keepAlive: false,
    },
    children: [
      {
        path: "personData",
        name: "personData",
        component: PersonData,
        meta: {
          showRightTitle: true,
          showBack: true,
          auth: true,
          keepAlive: false,
        },
      },
    ],
  },

  /***********************************左侧菜单菜单路由**************************************/

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
      keepAlive: false,
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
      keepAlive: false,
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
      keepAlive: false,
    },
  },
  // 设计导航
  {
    path: "/ui",
    name: "ui",
    component: WebSite,
    meta: {
      activeMenu: "/ui",
      showRightTitle: true,
      showBack: false,
      auth: false,
    },
    keepAlive: false,
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
      keepAlive: false,
    },
  },
  // 下载导航
  {
    path: "/download",
    name: "download",
    component: WebSite,
    meta: {
      activeMenu: "/download",
      showRightTitle: true,
      showBack: false,
      auth: false,
      keepAlive: false,
    },
  },
  // 工具导航
  {
    path: "/tool",
    name: "tool",
    component: WebSite,
    meta: {
      activeMenu: "/tool",
      showRightTitle: true,
      showBack: false,
      auth: false,
      keepAlive: false,
    },
  },
  // 其它导航
  {
    path: "/other",
    name: "other",
    component: WebSite,
    meta: {
      activeMenu: "/other",
      showRightTitle: true,
      showBack: false,
      auth: false,
      keepAlive: false,
    },
  },

  /***********************************顶部菜单路由**************************************/

  // 软件下载
  {
    path: "/software",
    name: "software",
    component: ArticleList,
    meta: {
      activeMenu: "/software",
      showRightTitle: true,
      showBack: false,
      auth: false,
      keepAlive: false,
    },
  },

  // 文章详情页面
  {
    path: "/article",
    name: "article",
    component: Article,
    meta: {
      activeMenu: "/",
      showRightTitle: true,
      showBack: false,
      auth: false,
      keepAlive: false,
    },
  },

  /***********************************管理菜单路由**************************************/

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
      keepAlive: false,
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
          keepAlive: false,
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
          keepAlive: false,
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
          keepAlive: false,
        },
      },
      // 用户菜单管理
      {
        path: "personmenu",
        name: "personmenu",
        component: PersonMenu,
        meta: {
          activeMenu: "/admin/personmenu",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
      // 图标管理
      {
        path: "iconfont",
        name: "iconfont",
        component: Iconfont,
        meta: {
          activeMenu: "/admin/iconfont",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
      // 顶部菜单管理
      {
        path: "topmenu",
        name: "topmenu",
        component: TopMenu,
        meta: {
          activeMenu: "/admin/topmenu",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
    ],
  },
  // 内容管理
  {
    path: "/content",
    name: "content",
    component: Content,
    meta: {
      activeMenu: "/content",
      showRightTitle: true,
      showBack: false,
      auth: true,
      keepAlive: false,
    },
    children: [
      // 发布内容
      {
        path: "publish",
        name: "publish",
        component: Publish,
        meta: {
          activeMenu: "/content/publish",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
      // 文章发布成功页面
      {
        path: "publishComplete",
        name: "publishComplete",
        component: PublishComplete,
        meta: {
          activeMenu: "",
          showRightTitle: true,
          showBack: true,
          auth: false,
          keepAlive: false,
        },
      },
      // 分类管理
      {
        path: "category",
        name: "category",
        component: Category,
        meta: {
          activeMenu: "/content/category",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
      // 文章管理
      {
        path: "articleManage",
        name: "articleManage",
        component: ArticleManage,
        meta: {
          activeMenu: "/content/articleManage",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
    ],
  },
  // 资源管理
  {
    path: "/source",
    name: "source",
    component: Source,
    meta: {
      activeMenu: "/source",
      showRightTitle: true,
      showBack: false,
      auth: true,
      keepAlive: false,
    },
    children: [
      // 资源管理
      {
        path: "sourcemanage",
        name: "sourcemanage",
        component: SourceManage,
        meta: {
          activeMenu: "/source/sourcemanage",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
      // 资源分类
      {
        path: "sourcecategory",
        name: "sourcecategory",
        component: SourceCategory,
        meta: {
          activeMenu: "/source/sourcecategory",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
        },
      },
    ],
  },
  // 轮播管理
  {
    path: "/carsouel",
    name: "carsouel",
    component: Carsouel,
    meta: {
      activeMenu: "/carsouel",
      showRightTitle: true,
      showBack: false,
      auth: true,
      keepAlive: false,
    },
    children: [
      // 轮播管理
      {
        path: "carsouelmanage",
        name: "carsouelmanage",
        component: CarsouelManage,
        meta: {
          activeMenu: "/carsouel/carsouelmanage",
          showRightTitle: true,
          showBack: false,
          auth: true,
          keepAlive: false,
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
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
