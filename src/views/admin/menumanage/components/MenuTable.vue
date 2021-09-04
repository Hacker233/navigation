<template>
  <div class="menu-table-box">
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menu_id"
      border
      stripe
      default-expand-all
      :tree-props="{ children: 'menu_child' }"
    >
      <el-table-column prop="menu_order" label="菜单顺序" sortable>
      </el-table-column>
      <el-table-column prop="menu_level" label="菜单级别">
        <template slot-scope="scope">
          <span v-if="scope.row.menu_level === 1">一级菜单</span>
          <span v-if="scope.row.menu_level === 2">二级菜单</span>
        </template>
      </el-table-column>
      <el-table-column prop="menu_router" label="菜单路由"> </el-table-column>
      <el-table-column prop="menu_icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.menu_icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="menu_name" label="菜单名称"> </el-table-column>
      <el-table-column prop="menu_role" label="菜单角色"> </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.menu_level === 1"
            size="mini"
            type="primary"
            @click="handleAddSubMenu(scope.$index, scope.row)"
            >新增</el-button
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
  </div>
</template>
<script>
import { deleteMenu } from "@/http/api/menu";
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // 新增子菜单
    handleAddSubMenu(index, item) {},
    // 删除菜单
    async handleDelete(index, item) {
      let params = {
        menuId: item.menu_id,
        parentMenuId: item.parent_menu_id || "",
      };
      const data = await deleteMenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.$parent.getMenu();
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
.menu-table-box {
  width: 100%;
  box-sizing: border-box;
}
</style>