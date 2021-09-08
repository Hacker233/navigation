<template>
  <div class="right-title-box">
    <div class="left"></div>
    <div class="person-box">
      <span @click="openLoginDialog">登录</span>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
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
  box-shadow: 0px 0px 6px rgba($color: #000000, $alpha: 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
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