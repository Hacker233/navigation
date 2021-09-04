<template>
  <div class="nav-bar-box">
    <el-menu
      router
      :default-active="activeRouter"
      class="el-menu-vertical-demo"
    >
      <template v-for="(item, index) of menuList">
        <el-menu-item
          v-if="!item.menu_child.length"
          :key="index"
          :index="item.menu_router"
        >
          <i :class="item.menu_icon"></i>
          <span slot="title">{{ item.menu_name }}</span>
        </el-menu-item>
        <el-submenu v-else :key="index" :index="item.menu_router">
          <template slot="title">
            <i :class="item.menu_icon"></i>
            <span>{{ item.menu_name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) of item.menu_child"
            :key="subIndex"
            :index="subItem.menu_router"
          >
            <i :class="subItem.menu_icon"></i>
            <span slot="title">{{ subItem.menu_name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeRouter() {
      let activeMenu = this.$route.meta.activeMenu;
      if (activeMenu) {
        return activeMenu;
      }
      return this.$route.path;
    },
    menuList() {
      return this.$store.state.menuList;
    },
  },
  async mounted() {
    // 获取导航栏信息
    this.$store.dispatch("getMenu");
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.nav-bar-box {
  width: 180px;
  height: 100%;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  ::v-deep .el-menu {
    height: 100%;
  }
}
</style>