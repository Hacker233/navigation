<template>
  <el-dialog
    title="添加图标"
    :visible.sync="addIconfontDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="图标类名" prop="iconfontClass">
        <el-input
          v-model="form.iconfontClass"
          clearable
          placeholder="请输入图标类名"
          :maxlength="20"
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
import { addIconfont } from "@/http/api/iconfont";
export default {
  props: {
    addIconfontDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        iconfontClass: "", // 图标类名
      },
      btnIsLoadgin: false,
      rules: {
        iconfontClass: [
          { required: true, message: "请填写菜单顺序", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 取消新增
    closeFirstDialog() {
      this.btnIsLoadgin = false;
      this.$emit("closeFirstDialog");
    },
    confirmFirstDialog(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addIconfont();
        } else {
          return false;
        }
      });
    },

    // 添加图标
    async addIconfont() {
      this.btnIsLoadgin = true;
      let params = {
        iconfontClass: this.form.iconfontClass,
      };
      const data = await addIconfont(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.form.iconfontClass = "";
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