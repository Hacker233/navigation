<template>
  <div class="tabbar-manage-box">
    <!-- 头部 -->
    <div class="tabbar-manage-title">
      <el-button type="primary" @click="openAddDialog">新增tabbar</el-button>
    </div>
    <!-- 菜单表格 -->
    <el-table
      :data="tabbarList"
      style="width: 100%; margin-bottom: 20px"
      row-key="topmenu_id"
      border
      stripe
    >
      <el-table-column prop="tabbar_name" label="tabbar名称" sortable>
      </el-table-column>
      <el-table-column prop="tabbar_role" label="tabbar角色"> </el-table-column>
      <el-table-column prop="tabbar_path" label="tabbar路径"> </el-table-column>
      <el-table-column prop="tabbar_show" label="tabbar显示"> </el-table-column>
      <el-table-column prop="tabbar_iconfont" label="tabbar图标">
        <template slot-scope="scope">
          <i class="iconfont" :class="scope.row.tabbar_iconfont"></i>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹窗 -->
    <add-tabbar-dialog
      :addTabbardialogVisible="addTabbardialogVisible"
      :baseInfo="baseInfo"
      @closeFirstDialog="closeFirstDialog"
      @confirmFirstDialog="confirmFirstDialog"
    ></add-tabbar-dialog>
  </div>
</template>
<script>
import AddTabbarDialog from "./components/AddTabbarDialog.vue";
import { getTabbar, deleteTabbar } from "@/http/api/tabbar";
export default {
  data() {
    return {
      addTabbardialogVisible: false,
      tabbarList: [],
      baseInfo: '', // 打开编辑页面
    };
  },
  components: {
    AddTabbarDialog,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化表格
    async init() {
      const data = await getTabbar();
      if (data.code === "00000") {
        this.tabbarList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 打开新增弹窗
    openAddDialog() {
      this.addTabbardialogVisible = true;
    },
    // 取消新增一级菜单
    closeFirstDialog() {
      this.addTabbardialogVisible = false;
    },
    // 点击确定关闭增加一级菜单弹窗
    confirmFirstDialog() {
      this.addTabbardialogVisible = false;
      this.init();
    },

    // 删除tabbar
    async handleDelete(row) {
      let params = {
        tabbarId: row.tabbar_id,
      };
      const data = await deleteTabbar(params);
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
    // 编辑tabbar
    handleEdit(row) {
      this.baseInfo = {
        tabbarId: row.tabbar_id,
        tabbarName: row.tabbar_name,
        tabbarPath: row.tabbar_path,
        tabbarRole: row.tabbar_role,
        tabbarIconfont: row.tabbar_iconfont,
        tabbarShow: row.tabbar_show,
      }
      this.addTabbardialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.tabbar-manage-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .tabbar-manage-title {
    margin-bottom: 20px;
  }
}
</style>