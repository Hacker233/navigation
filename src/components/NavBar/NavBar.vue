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
          :route="{ path: item.menu_router, query: { menuId: item.menu_id } }"
        >
          <i :class="['iconfont',item.menu_icon]"></i>
          <span slot="title">{{ item.menu_name }}</span>
        </el-menu-item>
        <el-submenu v-else :key="index" :index="item.menu_router">
          <template slot="title">
            <i :class="['iconfont',item.menu_icon]"></i>
            <span>{{ item.menu_name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, subIndex) of item.menu_child"
            :key="subIndex"
            :index="subItem.menu_router"
            :route="{
              path: subItem.menu_router,
              query: { menuId: subItem.menu_id },
            }"
          >
            <i :class="['iconfont',subItem.menu_icon]"></i>
            <span slot="title">{{ subItem.menu_name }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { getUserInfo } from "@/http/api/user";
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
  mounted() {
    this.init();
    this.getUserInfo();
  },
  methods: {
    init() {
      // 获取导航栏信息
      this.$store.dispatch("getMenu");
    },
    // 查询用户信息
    async getUserInfo() {
      const data = await getUserInfo();
      if (data.code === "00000") {
        this.userInfo = data.data;
        this.$store.commit("setUserInfo", this.userInfo);
      } else {
        this.userInfo = "";
      }
    },
  },
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