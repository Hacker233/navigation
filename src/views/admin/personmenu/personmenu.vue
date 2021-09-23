<template>
  <div class="person-menu-box">
    <!-- 头部 -->
    <div class="person-menu-title">
      <el-button type="primary" @click="openAddDialog">新增用户菜单</el-button>
    </div>
    <!-- 表格 -->
    <person-menu-table
      :menuList="userMenuList"
      @deleteSuccess="deleteSuccess"
    ></person-menu-table>
    <!-- 新增菜单弹窗 -->
    <add-menu-dialog
      :addMenuDialogVisible="addMenuDialogVisible"
      @closeFirstDialog="closeFirstDialog"
      @confirmFirstDialog="confirmFirstDialog"
    ></add-menu-dialog>
  </div>
</template>
<script>
import PersonMenuTable from "./components/PersonMenuTable";
import AddMenuDialog from "./components/AddMenuDialog";
import { getUsermenu } from "@/http/api/usermenu";
export default {
  data() {
    return {
      userMenuList: [],
      addMenuDialogVisible: false,
    };
  },
  components: {
    PersonMenuTable,
    AddMenuDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化表格
    async init() {
      const data = await getUsermenu();
      if (data.code === "00000") {
        this.userMenuList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开新增弹窗
    openAddDialog() {
      this.addMenuDialogVisible = true;
    },
    // 取消新增菜单
    closeFirstDialog() {
      this.addMenuDialogVisible = false;
    },
    // 点击确定关闭增加菜单弹窗
    confirmFirstDialog() {
      this.init();
      this.addMenuDialogVisible = false;
    },
    // 删除成功
    deleteSuccess() {
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.person-menu-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .person-menu-title {
    margin-bottom: 20px;
  }
}
</style>