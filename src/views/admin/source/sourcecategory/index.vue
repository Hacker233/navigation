<template>
  <div class="source-category-box">
    <!-- 头部 -->
    <div class="source-category-title">
      <el-button type="primary" @click="openAddDialog">新增分类</el-button>
    </div>
    <!-- 分类表格 -->
    <el-table
      :data="categoryList"
      style="width: 100%; margin-bottom: 20px"
      row-key="socategory_id"
      border
      stripe
    >
      <el-table-column prop="socategory_id" label="分类ID"> </el-table-column>
      <el-table-column prop="socategory_name" label="分类名称">
      </el-table-column>
      <el-table-column prop="socategory_icon" label="图标">
        <template slot-scope="scope">
          <i class="iconfont" :class="scope.row.socategory_icon"></i>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <category-dialog
      :title="title"
      :categoryDialogVisible="categoryDialogVisible"
      @closeDialog="closeDialog"
      @confirmCloseDialog="confirmCloseDialog"
      :baseInfo="baseInfo"
    ></category-dialog>
  </div>
</template>
<script>
import CategoryDialog from "./components/CategoryDialog.vue";
import { querySocategoryAll, deleteSocategory } from "@/http/api/socategory";
export default {
  data() {
    return {
      categoryDialogVisible: false,
      title: "新增分类",
      categoryList: [],
      baseInfo: {
        socategoryId: "",
        socategoryName: "", // 分类名称
      },
    };
  },
  components: {
    CategoryDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化分类表格
    async init() {
      const data = await querySocategoryAll();
      if (data.code === "00000") {
        this.categoryList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开新增弹窗
    openAddDialog() {
      this.title = "新增分类";
      this.categoryDialogVisible = true;
    },
    // 取消弹窗
    closeDialog() {
      this.categoryDialogVisible = false;
    },
    // 提交弹窗
    confirmCloseDialog() {
      this.categoryDialogVisible = false;
      this.init();
    },
    // 编辑分类
    async handleEdit(row) {
      this.categoryDialogVisible = true;
      this.title = "编辑分类";
      this.baseInfo = {
        socategoryId: row.socategory_id,
        socategoryName: row.socategory_name, // 分类名称
      };
    },
    // 删除资源分类
    async handleDelete(row) {
      let params = {
        socategoryId: row.socategory_id,
      };
      const data = await deleteSocategory(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.init();
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
.source-category-title {
  margin-bottom: 20px;
}
</style>