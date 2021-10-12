<template>
  <div class="nav-bar-box">
    <div class="index-menu" @click="toHome">
      <i class="iconfont pig-zhu"></i>
      <span>小猪导航</span>
    </div>
    <div class="menu-box">
      <el-menu
        router
        :default-active="activeRouter"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#545c64"
      >
        <template v-for="(item, index) of menuList">
          <el-menu-item
            v-if="!item.menu_child.length"
            :key="index"
            :index="item.menu_router"
            :route="{
              path: item.menu_router,
              query: { menuId: item.menu_id, menuIcon: item.menu_icon },
            }"
          >
            <i :class="['iconfont', item.menu_icon]"></i>
            <span slot="title">{{ item.menu_name }}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="item.menu_router">
            <template slot="title">
              <i :class="['iconfont', item.menu_icon]"></i>
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
              <i :class="['iconfont', subItem.menu_icon]"></i>
              <span slot="title">{{ subItem.menu_name }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 获取导航栏信息
      this.$store.dispatch("getMenu");
      // 获取顶部菜单
      this.$store.dispatch("getTopmenu");
      this.$store.dispatch("getUserInfo"); // 获取用户信息
    },
    // 跳转至首页
    toHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
}
.nav-bar-box {
  width: 180px;
  height: 100%;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  ::v-deep .el-menu {
    height: 100%;
    overflow: auto;
    .el-menu-item {
      min-width: 100px;
    }
  }
  .menu-box {
    flex: 1;
    overflow: auto;
  }
  .index-menu {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    user-select: none;
    background: #fff;
    .iconfont {
      font-size: 30px;
    }
    span {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 3px;
      margin-left: 5px;
      box-sizing: border-box;
      &:hover {
        color: blueviolet;
      }
    }
  }
}
</style>