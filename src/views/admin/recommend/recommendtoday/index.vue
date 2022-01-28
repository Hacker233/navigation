<template>
  <div class="recommend-today-box">
    <!-- 头部 -->
    <div class="recommend-today-title">
      <el-button type="primary" @click="openAddDialog">新增推荐</el-button>
    </div>

    <!-- 今日推荐表格 -->
    <el-table
      :data="hotTodayList"
      style="width: 100%; margin-bottom: 20px"
      row-key="socategory_id"
      border
      stripe
      max-height="250"
    >
      <el-table-column prop="today_id" label="推荐ID"> </el-table-column>
      <el-table-column prop="today_projectId" label="项目id">
      </el-table-column>
      <el-table-column prop="today_name" label="项目名称">
      </el-table-column>
      <el-table-column prop="today_type" label="项目类型">
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
import AddDialog from "./components/AddDialog.vue";
import {
  getRecommendToday,
  deleteRecommendToday,
} from "@/http/api/recommend.js";
export default {
  data() {
    return {
      recommendDialogVisible: false,
      hotTodayList: [],
    };
  },
  components: {
    AddDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化今日推荐表格
    async init() {
      const data = await getRecommendToday();
      if (data.code === "00000") {
        this.hotTodayList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
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
    // 删除推荐
    async deleteRecommend(item) {
      let params = {
        hotTodayType: item.today_type,
        hotTodayProjectId: item.today_projectId,
        hotTodayId: item.hot_todayId,
      };
      const data = await deleteRecommendToday(params);
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
.recommend-today-title {
  margin-bottom: 20px;
}
</style>