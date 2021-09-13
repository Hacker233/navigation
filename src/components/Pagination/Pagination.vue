<template>
  <div class="pagination-box">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      hide-on-single-page
      :page-count="pageCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    // 总条数
    total: {
      type: Number,
      default: 0,
    },
    // 总页数
    pageCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    currentChange(currentPage) {
      this.$emit("currentChange", currentPage);
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination-box {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>