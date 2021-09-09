<template>
  <el-dialog
    title="新增一级菜单"
    :visible.sync="addFirtstMenudialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="菜单顺序" prop="menuOrder">
        <el-input v-model="form.menuOrder"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="form.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由" prop="menuRouter">
        <el-input v-model="form.menuRouter"></el-input>
      </el-form-item>
      <el-form-item label="菜单角色" prop="menuRole">
        <el-select v-model="form.menuRole" placeholder="请选择菜单角色">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标" prop="menuIcon">
        <el-input v-model="form.menuIcon"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFirstDialog">取 消</el-button>
      <el-button type="primary" @click="confirmFirstDialog('ruleForm')"
        >确 定</el-button
      >
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
      rules: {
        menuOrder: [
          { required: true, message: "请填写菜单顺序", trigger: "blur" },
        ],
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        menuRouter: [
          { required: true, message: "请输入路由地址", trigger: "blur" },
        ],
        menuRole: [{ required: true, message: "请选择角色", trigger: "blur" }],
        menuIcon: [
          { required: true, message: "请输入菜单图标", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 取消新增
    closeFirstDialog() {
      this.$emit("closeFirstDialog");
    },
    confirmFirstDialog(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMenu();
        } else {
          return false;
        }
      });
    },

    // 新增一级菜单
    async addMenu() {
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