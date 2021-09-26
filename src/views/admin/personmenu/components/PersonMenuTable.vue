<template>
  <div class="menu-table-box">
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menu_id"
      border
      stripe
      default-expand-all
    >
      <el-table-column prop="usermenu_id" label="菜单id"> </el-table-column>
      <el-table-column prop="usermenu_name" label="菜单名称"> </el-table-column>
      <el-table-column prop="usermenu_order" label="菜单顺序" sortable>
      </el-table-column>
      <el-table-column prop="usermenu_router" label="菜单地址">
      </el-table-column>
      <el-table-column prop="usermenu_role" label="菜单角色"> </el-table-column>
      <el-table-column prop="usermenu_icon" label="菜单图标">
        <template slot-scope="scope">
          <i class="iconfont" :class="scope.row.usermenu_icon"></i>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <add-menu-dialog
      :addMenuDialogVisible="addMenuDialogVisible"
      :baseInfo="baseInfo"
      title="编辑用户菜单"
      @closeFirstDialog="closeFirstDialog"
      @confirmUpdateDialog="confirmUpdateDialog"
    ></add-menu-dialog>
  </div>
</template>
<script>
import { deleteUsermenu } from "@/http/api/usermenu";
import AddMenuDialog from "./AddMenuDialog";
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AddMenuDialog,
  },
  data() {
    return {
      addMenuDialogVisible: false,
      baseInfo: "",
    };
  },
  methods: {
    // 编辑菜单
    handleEdit(index, row) {
      this.baseInfo = {
        usermenuId: row.usermenu_id, // 菜单id
        usermenuOrder: row.usermenu_order, // 菜单顺序
        usermenuName: row.usermenu_name, // 菜单名称
        usermenuRouter: row.usermenu_router, // 菜单路由
        usermenuRole: row.usermenu_role, // 菜单角色
        usermenuIcon: row.usermenu_icon, // 菜单图标
      };
      this.addMenuDialogVisible = true;
    },
    // 弹窗取消
    closeFirstDialog() {
      this.baseInfo = "";
      this.addMenuDialogVisible = false;
    },
    // 弹窗确认
    confirmUpdateDialog() {
      this.$emit("updateSuccess");
      this.baseInfo = "";
      this.addMenuDialogVisible = false;
    },
    // 删除菜单
    async handleDelete(index, row) {
      let params = {
        usermenuId: row.usermenu_id,
      };
      const data = await deleteUsermenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.$emit("deleteSuccess");
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