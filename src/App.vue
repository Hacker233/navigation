<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view class="router-view" />
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  .router-view {
    padding-left: 180px;
    box-sizing: border-box;
  }
}
</style>
