<template>
  <el-dialog
    title="新增一级菜单"
    :visible.sync="addFirtstMenudialogVisible"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单顺序">
        <el-input v-model="form.menuOrder"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="form.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由">
        <el-input v-model="form.menuRouter"></el-input>
      </el-form-item>
      <el-form-item label="菜单角色">
        <el-select v-model="form.menuRole" placeholder="请选择菜单角色">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.menuIcon"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFirstDialog">取 消</el-button>
      <el-button type="primary" @click="confirmFirstDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addMenu } from "@/http/api/menu";
export default {
  props: {
    addFirtstMenudialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        menuOrder: "", // 菜单顺序
        menuName: "", // 菜单名称
        menuRouter: "", // 菜单路由
        menuRole: "", // 菜单角色
        menuIcon: "", // 菜单图标
      },
    };
  },
  methods: {
    // 取消新增
    closeFirstDialog() {
      this.$emit("closeFirstDialog");
    },
    // 新增一级菜单
    async confirmFirstDialog() {
      let params = {
        menuOrder: this.form.menuOrder,
        menuName: this.form.menuName,
        menuRouter: this.form.menuRouter,
        menuRole: this.form.menuRole,
        menuIcon: this.form.menuIcon,
      };
      const data = await addMenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("confirmFirstDialog");
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