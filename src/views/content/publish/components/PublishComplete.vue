<template>
  <div class="publish-complete-box">
    <div class="iconfont-box">
      <i class="iconfont pig-xiao"></i>
      <p>发布成功</p>
    </div>
    <div class="to-detaile-box">
      <el-button type="text" @click="toArticleDetail">点击查看详情</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toArticleDetail() {
      let params = this.$route.query;
      this.$router.push({
        name: "article",
        query: params,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.publish-complete-box {
  width: 100%;
  padding: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .iconfont-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 100px;
    }
    p {
      font-size: 14px;
      margin-top: 14px;
    }
  }
  .to-detaile-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>