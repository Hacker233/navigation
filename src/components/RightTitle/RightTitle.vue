<template>
  <div class="right-title-box">
    <div class="left"></div>
    <div class="person-box">
      <el-button v-if="!userInfo" type="text" @click="openLoginDialog"
        >登录/注册</el-button
      >
      <el-dropdown v-else>
        <el-avatar class="avatar" :src="userInfo.avatar"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
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
  },
};
</script>
<style lang="scss" scoped>
.right-title-box {
  width: 100%;
  height: 50px;
  box-shadow: 2px 4px 4px #b9b9b9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  .person-box {
    padding: 0 40px 0 0;
    span {
      font-size: 14px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: royalblue;
      }
    }
  }
}
</style>