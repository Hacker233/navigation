<template>
  <div class="hot-website-box">
    <!-- 头部 -->
    <div class="recommend-today-title">
      <el-button type="primary" @click="openAddDialog">新增推荐</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    openAddDialog() {}
  },
};
</script>
<style lang="scss" scoped>
.hot-website-box {
  .recommend-today-title {
    margin: 0 0 20px 0;
  }
}
</style>