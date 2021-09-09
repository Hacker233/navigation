<template>
  <div class="iframe-box">
    <div class="back-title">
      <div class="back-left" @click="goBack">
        <i class="iconfont pig-fanhui"></i>
        <span>返回</span>
      </div>
    </div>
    <iframe :src="$route.query.url" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
  .back-title {
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-bottom: 1px solid #ccc;
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
  iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
}
</style>