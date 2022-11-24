<template>
  <div class="source-manage-box">
    <!-- 头部 -->
    <div class="source-manamge-title">
      <el-button type="primary" @click="openAddDialog">新增资源</el-button>
    </div>
    <!-- 资源表格 -->
    <el-table
      :data="sourceList"
      style="width: 100%; margin-bottom: 20px"
      row-key="socategory_id"
      border
      stripe
    >
      <el-table-column prop="source_title" label="资源名称"> </el-table-column>
      <el-table-column prop="source_cover" label="资源封面">
        <template slot-scope="scope">
          <img
            class="table-img"
            :src="scope.row.source_cover"
            alt=""
            srcset=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="source_abstract" label="资源简介">
        <template slot-scope="scope">
          <div v-html="scope.row.source_abstract"></div>
        </template>
      </el-table-column>
      <el-table-column prop="source_tags" label="资源标签">
        <template slot-scope="scope">
          <div
            class="source-download"
            v-for="(item, index) in scope.row.source_tags"
            :key="index"
          >
            <p>{{ item }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="source_category" label="资源分类">
      </el-table-column>
      <el-table-column prop="source_download" label="资源下载">
        <template slot-scope="scope">
          <div
            class="source-download"
            v-for="(item, index) in scope.row.source_download"
            :key="index"
          >
            <p>名称:{{ item.name }}</p>
            <p>下载链接:{{ item.link }}</p>
            <p>提取码:{{ item.pass }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="source_screen" label="资源截图">
        <template slot-scope="scope">
          <img
            v-for="(item, index) in scope.row.source_screen"
            :key="index"
            class="table-img"
            :src="item.response.data.fileUrl"
            alt=""
            srcset=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="source_create_date" label="资源发布时间">
      </el-table-column>
      <el-table-column prop="source_views" label="浏览量"> </el-table-column>
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
    <!-- 分页 -->
    <Pagination
      :total="total"
      :pageCount="pageCount"
      @currentChange="currentChange"
    ></Pagination>
    <!-- 弹窗 -->
    <source-dialog
      :title="title"
      :sourceDialogVisible="sourceDialogVisible"
      :socategoryList="socategoryList"
      :baseInfo="baseInfo"
      @closeDialog="closeDialog"
      @confirmCloseDialog="confirmCloseDialog"
    ></source-dialog>
  </div>
</template>
<script>
import SourceDialog from "./components/SourceDialog.vue";
import { querySocategoryAll } from "@/http/api/socategory";
import { querySourceAll, deleteSource } from "@/http/api/source";
import Pagination from "@/components/Pagination/Pagination"; // 分页组件
export default {
  data() {
    return {
      sourceDialogVisible: false,
      title: "新增资源",
      socategoryList: [],
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      pageCount: 0, // 总页数
      sourceList: [],
      baseInfo: {
        sourceTitle: "", // 资源名称
        socategoryName: "", // 资源分类
        sourceAbstract: "", // 资源简介
        sourceTags: [], // 资源标签
        sourceCover: "", // 资源封面地址
        sourceDownload: [
          {
            name: "",
            link: "",
            pass: "",
          },
        ], // 资源下载链接
        sourceScreen: [], // 资源截图
      },
    };
  },
  components: {
    SourceDialog,
    Pagination,
  },
  mounted() {
    this.querySocategoryList();
    this.init();
  },
  methods: {
    // 初始化表格
    async init() {
      let params = {
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
      };
      const data = await querySourceAll(params);
      if (data.code === "00000") {
        this.sourceList = data.data.data;
        this.total = data.data.page.count;
        this.pageCount = data.data.page.pageCount; // 总页数
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 当前页发生变化
    currentChange(currentPage) {
      this.pageParams.page = currentPage; // 更改查询页面
      this.init();
    },
    // 提交弹窗
    confirmCloseDialog() {
      this.categoryDialogVisible = false;
      this.init();
    },
    // 打开新增弹窗
    openAddDialog() {
      this.title = "新增资源";
      this.sourceDialogVisible = true;
    },
    // 取消弹窗
    closeDialog() {
      this.sourceDialogVisible = false;
    },
    // 获取所有资源分类
    async querySocategoryList() {
      const data = await querySocategoryAll();
      if (data.code === "00000") {
        this.socategoryList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开编辑弹窗
    handleEdit(row) {
      this.title = "编辑资源";
      this.sourceDialogVisible = true;
      this.baseInfo = {
        sourceId: row.source_id,
        sourceTitle: row.source_title, // 资源名称
        socategoryName: row.source_category, // 资源分类
        sourceAbstract: row.source_abstract, // 资源简介
        sourceTags: row.source_tags, // 资源标签
        sourceCover: row.source_cover, // 资源封面地址
        sourceDownload: row.source_download, // 资源下载链接
        sourceScreen: row.source_screen, // 资源截图
      };
      console.log(row);
    },
    async handleDelete(row) {
      let params = {
        sourceId: row.source_id,
      };
      const data = await deleteSource(params);
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
.source-manage-box {
  .source-manamge-title {
    margin-bottom: 20px;
  }
  .table-img {
    max-width: 100px;
  }
}
</style>
