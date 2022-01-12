<template>
  <div class="carsouel-manage-box">
    <!-- 头部 -->
    <div class="carsouel-manamge-title">
      <el-button type="primary" @click="openAddDialog">新增轮播</el-button>
    </div>
    <!-- 弹窗 -->
    <carsouel-dialog
      :title="title"
      :carsouelDialogVisible="carsouelDialogVisible"
      :baseInfo="baseInfo"
      @closeDialog="closeDialog"
      @confirmCloseDialog="confirmCloseDialog"
    ></carsouel-dialog>
  </div>
</template>
<script>
import CarsouelDialog from "./components/CarsouelDialog.vue";
export default {
  data() {
    return {
      carsouelDialogVisible: false,
    };
  },
  components: {
    CarsouelDialog,
  },
  methods: {
    // 打开弹窗
    openAddDialog() {
      this.title = "新增轮播";
      this.carsouelDialogVisible = true;
    },
    // 取消弹窗
    closeDialog() {
      this.carsouelDialogVisible = false;
    },
    // 提交弹窗
    confirmCloseDialog() {
      this.carsouelDialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.carsouel-manage-box {
  .carsouel-manamge-title {
    margin-bottom: 20px;
  }
}
</style>