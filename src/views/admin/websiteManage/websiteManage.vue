<template>
  <div class="website-box">
    <!-- 头部 -->
    <div class="title-box">
      <el-button type="primary" @click="openaddWebsiteDialog"
        >新增网站</el-button
      >
      <!-- 新增网站弹窗 -->
      <add-website-dialog
        :addWebsiteDialogVisible="addWebsiteDialogVisible"
      ></add-website-dialog>
    </div>
  </div>
</template>
<script>
import AddWebsiteDialog from "./components/AddWebsiteDialog.vue"; // 添加站点弹窗
export default {
  data() {
    return {
      addWebsiteDialogVisible: false,
    };
  },
  components: {
    AddWebsiteDialog,
  },
  methods: {
    // 打开新增网站弹窗
    openaddWebsiteDialog() {
      this.addWebsiteDialogVisible = true;
    },
    // 点击取消按钮
    closeAddWebsiteDialog() {
      this.addWebsiteDialogVisible = false;
    },
    // 点击确定按钮
    confirmAddWebsiteDialog() {
      this.addWebsiteDialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.website-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .title-box {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
}
</style>