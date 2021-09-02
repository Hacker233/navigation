<template>
  <div class="nav-bar-box">
    <el-menu router :default-active="activeRouter" class="el-menu-vertical-demo">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="movie">
        <i class="el-icon-menu"></i>
        <span slot="title">影视导航</span>
      </el-menu-item>
      <el-menu-item index="book">
        <i class="el-icon-document"></i>
        <span slot="title">电子书导航</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">动漫导航</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {},
  computed: {
    activeRouter() {
      let activeMenu = this.$route.meta.activeMenu;
      if (activeMenu) {
        return activeMenu;
      }
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-bar-box {
  width: 180px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  ::v-deep .el-menu {
    height: 100%;
  }
}
</style>