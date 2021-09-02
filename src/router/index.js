import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/home/home.vue");
const Movie = () => import("@/views/movie/index.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
  },
  {
    path: "/movie",
    name: "movie",
    component: Movie,
    meta: {
      activeMenu: "/movie",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
