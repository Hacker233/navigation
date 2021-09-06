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
        @closeAddWebsiteDialog="closeAddWebsiteDialog"
        @confirmAddWebsiteDialog="confirmAddWebsiteDialog"
      ></add-website-dialog>
    </div>
    <!-- 网站表格 -->
    <div class="website-table">
      <website-table :websiteList="websiteList"></website-table>
    </div>
  </div>
</template>
<script>
import AddWebsiteDialog from "./components/AddWebsiteDialog"; // 添加站点弹窗
import WebsiteTable from "./components/WebsiteTable";
import { queryWebsite } from "@/http/api/website";

export default {
  data() {
    return {
      addWebsiteDialogVisible: false,
      websiteList: [],
    };
  },
  components: {
    AddWebsiteDialog,
    WebsiteTable,
  },
  mounted() {
    // 获取网站列表
    this.getWebsitList();
  },
  methods: {
    // 打开新增网站弹窗
    openaddWebsiteDialog() {
      this.addWebsiteDialogVisible = true;
    },
    // 点击取消按钮
    closeAddWebsiteDialog() {
      this.addWebsiteDialogVisible = false;
      console.log(this.addWebsiteDialogVisible);
    },
    // 点击确定按钮
    confirmAddWebsiteDialog() {
      this.getWebsitList(); // 更新网站列表
      this.addWebsiteDialogVisible = false;
    },
    // 获取网站列表
    async getWebsitList() {
      let params = {};
      const data = await queryWebsite(params);
      if (data.code === "00000") {
        this.websiteList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
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