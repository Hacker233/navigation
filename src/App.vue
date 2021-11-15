<template>
  <div id="app">
    <nav-bar v-if="isActive"></nav-bar>
    <div class="right-content" v-if="isActive" v-infinite-scroll="load">
      <right-title v-if="$route.meta.showRightTitle"></right-title>
      <template v-if="$route.meta.keepAlive"
        ><keep-alive> <router-view :key="$route.path" /> </keep-alive
      ></template>
      <template v-else>
        <router-view :key="$route.path" />
      </template>
    </div>
    <!-- github图标 -->
    <github-card></github-card>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import RightTitle from "@/components/RightTitle/RightTitle.vue";
import GithubCard from "@/components/GithubCard/GithubCard";
export default {
  // 控制局部刷新组件
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isActive: true,
    };
  },
  components: {
    NavBar,
    RightTitle,
    GithubCard,
  },
  methods: {
    reload() {
      this.isActive = false;
      this.$nextTick(() => {
        this.isActive = true;
      });
    },
    load() {
      console.log("发起请求");
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  min-width: 1400px;
  position: relative;
  .right-content {
    width: 100%;
    padding-left: 180px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>