<template>
  <el-dialog
    title="新增菜单"
    :visible.sync="addMenuDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="菜单顺序" prop="usermenuOrder">
        <el-input
          v-model="form.usermenuOrder"
          clearable
          placeholder="请输入菜单顺序"
          :maxlength="2"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" prop="usermenuName">
        <el-input
          v-model="form.usermenuName"
          clearable
          placeholder="请输入菜单名称"
          :maxlength="4"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单路由" prop="usermenuRouter">
        <el-input
          v-model="form.usermenuRouter"
          clearable
          placeholder="请输入菜单路由"
          :maxlength="40"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单角色" prop="usermenuRole">
        <el-select v-model="form.usermenuRole" placeholder="请选择菜单角色">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标" prop="usermenuIcon">
        <el-input
          v-model="form.usermenuIcon"
          :maxlength="40"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFirstDialog">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmFirstDialog('ruleForm')"
        :loading="btnIsLoadgin"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { addUsermenu } from "@/http/api/usermenu";
export default {
  props: {
    addMenuDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        usermenuOrder: "", // 菜单顺序
        usermenuName: "", // 菜单名称
        usermenuRouter: "", // 菜单路由
        usermenuRole: "", // 菜单角色
        usermenuIcon: "", // 菜单图标
      },
      btnIsLoadgin: false,
      rules: {
        usermenuOrder: [
          { required: true, message: "请填写菜单顺序", trigger: "blur" },
        ],
        usermenuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        usermenuRouter: [
          { required: true, message: "请输入路由地址", trigger: "blur" },
        ],
        usermenuRole: [
          { required: true, message: "请选择角色", trigger: "blur" },
        ],
        usermenuIcon: [
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
      this.btnIsLoadgin = true;
      let params = {
        usermenuOrder: this.form.usermenuOrder,
        usermenuName: this.form.usermenuName,
        usermenuRouter: this.form.usermenuRouter,
        usermenuRole: this.form.usermenuRole,
        usermenuIcon: this.form.usermenuIcon,
      };
      const data = await addUsermenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("confirmFirstDialog");
        this.btnIsLoadgin = false;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnIsLoadgin = false;
      }
    },
  },
};
</script>