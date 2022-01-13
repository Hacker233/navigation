<template>
  <div class="carsouel-manage-box">
    <!-- 头部 -->
    <div class="carsouel-manamge-title">
      <el-button type="primary" @click="openAddDialog">新增轮播</el-button>
    </div>
    <!-- 轮播表格 -->
    <el-table
      :data="carsouelList"
      style="width: 100%; margin-bottom: 20px"
      row-key="carsouel_id"
      border
      stripe
    >
      <el-table-column prop="carsouel_name" label="轮播名称"> </el-table-column>
      <el-table-column prop="carsouel_url" label="轮播图">
        <template slot-scope="scope">
          <img
            class="table-img"
            :src="scope.row.carsouel_url"
            alt=""
            srcset=""
          />
        </template>
      </el-table-column>
      <el-table-column prop="carsouel_path" label="轮播图跳转路径">
      </el-table-column>
      <el-table-column prop="carsouel_page" label="轮播图所属页面">
      </el-table-column>
      <el-table-column prop="carsouel_params" label="轮播图参数">
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
import { getAllCarsouel, deleteCarsouel } from "@/http/api/carsouel";
export default {
  data() {
    return {
      carsouelDialogVisible: false,
      carsouelList: [],
      title: "新增轮播",
      baseInfo: {
        carsouelId: "",
        carsouelUrl: "", // 轮播图url
        carsouelPage: "", // 轮播图所属页面
        carsouelName: "", // 轮播图名称
        carsouelPath: "", // 轮播图跳转链接
        carsouelParams: "", // 轮播图跳转参数
      },
    };
  },
  components: {
    CarsouelDialog,
  },
  mounted() {
    this.getAllCarsouelAsync();
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
      this.getAllCarsouelAsync();
    },
    // 查询所有轮播图
    async getAllCarsouelAsync() {
      const data = await getAllCarsouel();
      if (data.code === "00000") {
        this.carsouelList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开编辑弹窗
    handleEdit(row) {
      this.title = "编辑轮播";
      this.carsouelDialogVisible = true;
      this.baseInfo = {
        carsouelId: row.carsouel_id,
        carsouelUrl: row.carsouel_url, // 轮播图url
        carsouelPage: row.carsouel_page, // 轮播图所属页面
        carsouelName: row.carsouel_name, // 轮播图名称
        carsouelPath: row.carsouel_path, // 轮播图跳转链接
        carsouelParams: row.carsouel_params, // 轮播图跳转参数
      };
      console.log("this.baseInfo", this.baseInfo);
    },
    async handleDelete(row) {
      let params = {
        carsouelId: row.carsouel_id,
      };
      const data = await deleteCarsouel(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getAllCarsouelAsync();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.carsouel-manage-box {
  .carsouel-manamge-title {
    margin-bottom: 20px;
  }
  .table-img {
    max-width: 150px;
  }
}
</style>