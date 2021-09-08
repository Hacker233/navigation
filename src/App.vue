<template>
  <div id="app">
    <nav-bar v-if="isActive"></nav-bar>
    <div class="right-content" v-if="isActive">
      <right-title v-if="$route.meta.showRightTitle"></right-title>
      <router-view />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import RightTitle from "@/components/RightTitle/RightTitle.vue";
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
  },
  methods: {
    reload() {
      this.isActive = false;
      this.$nextTick(() => {
        this.isActive = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  .right-content {
    width: 100%;
    padding-left: 180px;
    box-sizing: border-box;
  }
}
</style>
