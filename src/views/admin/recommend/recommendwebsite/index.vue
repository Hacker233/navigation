<template>
  <div class="hot-website-box">
    <!-- 头部 -->
    <div class="recommend-today-title">
      <el-button type="primary" @click="openAddDialog">新增热门网站</el-button>
    </div>

    <!-- 热门网站表格 -->
    <el-table
      :data="hotWebsiteList"
      style="width: 100%; margin-bottom: 20px"
      row-key="website_id"
      border
      stripe
    >
      <el-table-column prop="website_title" label="网站名称"> </el-table-column>
      <el-table-column prop="website_menu_name" label="网站所属菜单">
      </el-table-column>
      <el-table-column prop="website_category" label="网站分类">
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteRecommend(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗 -->
    <add-dialog
      ref="addDialog"
      :recommendDialogVisible="recommendDialogVisible"
      @closeDialog="closeDialog"
      @updateHotList="updateHotList"
    ></add-dialog>
  </div>
</template>
<script>
import { getHotWebsite, deleteHotWebsite } from "@/http/api/recommend.js";
import AddDialog from "./components/AddDialog.vue";
export default {
  data() {
    return {
      hotWebsiteList: [], // 热门网站列表
      recommendDialogVisible: false,
    };
  },
  components: {
    AddDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化热门网站列表
    async init() {
      const data = await getHotWebsite();
      if (data.code === "00000") {
        this.hotWebsiteList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开新增推荐弹窗
    openAddDialog() {
      this.recommendDialogVisible = true;
    },
    // 取消弹窗
    closeDialog() {
      this.recommendDialogVisible = false;
    },
    // 更新列表
    updateHotList() {
      this.init();
    },
    // 删除推荐网站
    async deleteRecommend(item) {
      let params = {
        websiteId: item.website_id,
      };
      const data = await deleteHotWebsite(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.init();
        this.$refs.addDialog.initWebsite();
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
.hot-website-box {
  .recommend-today-title {
    margin: 0 0 20px 0;
  }
}
</style>