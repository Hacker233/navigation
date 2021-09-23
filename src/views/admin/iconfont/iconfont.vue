<template>
  <div class="iconfont-box">
    <!-- 头部 -->
    <div class="iconfont-title">
      <el-button type="primary" @click="openAddDialog">添加图标</el-button>
    </div>
    <!-- 图标预览 -->
    <div class="iconfont-card-wraper">
      <iconfont-card
        v-for="(item, index) of iconfontList"
        :key="index"
        :iconfontInfo="item"
        @deleteIconfontSuccess="deleteIconfontSuccess"
      ></iconfont-card>
    </div>
    <!-- 新增图标弹窗 -->
    <add-iconfont-dialog
      :addIconfontDialogVisible="addIconfontDialogVisible"
      @closeFirstDialog="closeFirstDialog"
      @confirmFirstDialog="confirmFirstDialog"
    ></add-iconfont-dialog>
  </div>
</template>
<script>
import AddIconfontDialog from "./components/AddIconfontDialog";
import IconfontCard from "./components/IconfontCard";
import { getIconfont } from "@/http/api/iconfont";
export default {
  data() {
    return {
      addIconfontDialogVisible: false,
      iconfontList: [], // 图标列表
    };
  },
  components: {
    AddIconfontDialog,
    IconfontCard,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化所有图标
    async init() {
      const data = await getIconfont();
      if (data.code === "00000") {
        this.iconfontList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 删除图标成功
    deleteIconfontSuccess() {
      this.init();
    },
    // 打开弹窗
    openAddDialog() {
      this.addIconfontDialogVisible = true;
    },
    // 取消弹窗
    closeFirstDialog() {
      this.addIconfontDialogVisible = false;
    },
    // 确定弹窗
    confirmFirstDialog() {
      this.init();
      this.addIconfontDialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .iconfont-title {
    margin-bottom: 20px;
  }
  .iconfont-card-wraper {
    display: flex;
    justify-content: space-around;
  }
}
</style>