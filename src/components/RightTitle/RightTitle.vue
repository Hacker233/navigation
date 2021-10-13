<template>
  <div class="right-title-box">
    <div class="left">
      <div class="back-left" @click="goBack" v-if="$route.meta.showBack">
        <i class="iconfont pig-fanhui"></i>
        <span>返回</span>
      </div>
    </div>
    <!-- 中间菜单 -->
    <div class="menu-center-box">
      <el-menu
        router
        :default-active="activeRouter"
        class="el-menu-demo"
        mode="horizontal"
      >
        <template v-for="(item, index) of topmenuList">
          <el-menu-item
            v-if="!item.topmenu_child.length"
            :key="index"
            :index="item.topmenu_router"
            :route="{
              path: item.topmenu_router,
              query: { menuId: item.topmenu_id, menuIcon: item.topmenu_icon },
            }"
          >
            <i :class="['iconfont', item.topmenu_icon]"></i>
            <span slot="title">{{ item.topmenu_name }}</span>
          </el-menu-item>
          <el-submenu v-else :key="index" :index="item.topmenu_router">
            <template slot="title">
              <i :class="['iconfont', item.topmenu_icon]"></i>
              <span>{{ item.topmenu_name }}</span>
            </template>
            <el-menu-item
              v-for="(subItem, subIndex) of item.topmenu_child"
              :key="subIndex"
              :index="subItem.topmenu_router"
              :route="{
                path: subItem.topmenu_router,
                query: { menuId: subItem.topmenu_id },
              }"
            >
              <i :class="['iconfont', subItem.topmenu_icon]"></i>
              <span slot="title">{{ subItem.topmenu_name }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="person-box">
      <el-button v-if="!userInfo" type="text" @click="openLoginDialog"
        >登录/注册</el-button
      >
      <template v-else>
        <span class="username">Hi {{ userInfo.username }}</span>
        <el-dropdown>
          <el-avatar class="avatar" :src="userInfo.avatar"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toPerson"
              >个人中心</el-dropdown-item
            >
            <el-dropdown-item @click.native="loginOut"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      activeIndex: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    activeRouter() {
      let activeMenu = this.$route.meta.activeMenu;
      if (activeMenu) {
        return activeMenu;
      }
      return this.$route.path;
    },
    topmenuList() {
      return this.$store.state.topmenuList;
    },
  },
  methods: {
    // 打开登录注册弹窗
    openLoginDialog() {
      this.$login({
        login: (data) => {
          if (data) {
            this.refresh();
          }
        },
        register: (data) => {
          if (data) {
            this.refresh();
          }
        },
      });
    },
    // 跳转至个人中心
    toPerson() {
      this.$router.push("/person/personData");
    },
    // 退出登录
    loginOut() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$store.commit("setUserInfo", "");
      this.refresh();
    },
    // 刷新页面,不会重载页面
    refresh() {
      this.reload();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont {
  margin-right: 10px;
}
.right-title-box {
  width: 100%;
  height: 50px;
  // box-shadow: 2px 4px 4px #b9b9b9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #eee;
  .left {
    padding-left: 20px;
    min-width: 70px;
    .back-left {
      cursor: pointer;
      &:hover {
        color: green;
      }
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
  .menu-center-box {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    ::v-deep .el-menu-item {
      line-height: 50px;
      height: 50px;
      color: green;
      transition: all 0.3s;
      &:hover {
        background-color: #67696b;
        color: #fff;
      }
    }
    ::v-deep .is-active {
      background-color: #67696b !important;
      color: #fff !important;
    }
  }
  .person-box {
    padding: 0 40px 0 0;
    display: flex;
    align-items: center;
    button {
      font-size: 14px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: royalblue;
      }
    }
    .username {
      margin: 0 20px;
      font-size: 14px;
      .avatar {
        cursor: pointer;
      }
    }
  }
}
</style>