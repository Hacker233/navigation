<template>
  <el-dialog
    :title="title"
    :visible.sync="editUserDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID">
        <el-input :placeholder="form.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.role" placeholder="请选择用户角色">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeUserEditDialog">取 消</el-button>
      <el-button type="primary" @click="confirmEditDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { updateUser } from "@/http/api/user";
export default {
  props: {
    editUserDialogVisible: {
      type: Boolean,
      default: false,
    },
    // 回显信息
    baseInfo: {
      default: "",
    },
  },
  data() {
    return {
      title: "更新用户信息",
      form: {
        uid: "", // 用户uid
        username: "", // 用户名
        email: "", // 邮箱地址
        role: "", // 角色
        avatar: "", // 头像
      },
    };
  },
  watch: {
    // 如果有回显信息,则赋值给form
    baseInfo(newVal, oldVal) {
      if (newVal) {
        this.form = this.baseInfo;
      } else {
        console.log(oldVal);
      }
    },
  },
  methods: {
    // 取消编辑
    closeUserEditDialog() {
      this.$emit("closeUserEditDialog");
    },
    // 确定按钮
    confirmEditDialog() {
      this.updateUser();
    },
    async updateUser() {
      let params = {
        uid: this.form.uid, // 用户uid
        username: this.form.username, // 用户名
        email: this.form.email, // 邮箱地址
        role: this.form.role, // 角色
        avatar: this.form.avatar, // 头像
      };
      const data = await updateUser(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("confirmEditDialog");
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