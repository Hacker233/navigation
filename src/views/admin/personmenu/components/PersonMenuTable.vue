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
  </div>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleEdit() {},
    handleDelete() {},
  },
};
</script>