<template>
  <div class="hot-source-box">
    <!-- 头部 -->
    <div class="recommend-today-title">
      <el-button type="primary" @click="openAddDialog">新增热门资源</el-button>
    </div>

    <!-- 热门资源表格 -->
    <el-table
      :data="hotSourceList"
      style="width: 100%; margin-bottom: 20px"
      row-key="source_id"
      border
      stripe
    >
      <el-table-column prop="source_title" label="资源名称"> </el-table-column>
      <el-table-column prop="source_category" label="资源分类">
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
import { getHotSource, deleteHotSource } from "@/http/api/recommend.js";
import AddDialog from "./components/AddDialog.vue";
export default {
  data() {
    return {
      hotSourceList: [], // 热门资源列表
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
    // 初始化热门资源列表
    async init() {
      const data = await getHotSource();
      if (data.code === "00000") {
        this.hotSourceList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 删除热门资源
    async deleteRecommend(item) {
      let params = {
        sourceId: item.source_id,
      };
      const data = await deleteHotSource(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.init();
        this.$refs.addDialog.initSource();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开弹窗
    openAddDialog() {
      this.recommendDialogVisible = true;
    },
    // 取消弹窗
    closeDialog() {
      this.recommendDialogVisible = false;
    },
    // 更新表格
    updateHotList() {
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.hot-source-box {
  .recommend-today-title {
    margin: 0 0 20px 0;
  }
}
</style>