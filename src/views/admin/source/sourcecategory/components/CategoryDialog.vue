<template>
  <div class="source-dialog">
    <el-dialog
      :title="title"
      :visible.sync="categoryDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="分类名称" prop="socategoryName">
          <el-input
            v-model="form.socategoryName"
            clearable
            placeholder="请输入分类名称"
            :maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addSocategory, updateSocategory } from "@/http/api/socategory";
export default {
  props: {
    categoryDialogVisible: { type: Boolean, default: false },
    // 弹窗标题
    title: {
      type: String,
      default: "新增",
    },
    // 回显信息
    baseInfo: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        socategoryId: "",
        socategoryName: "", // 分类名称
      },
      rules: {
        socategoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
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
    // 取消弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 确认弹窗
    confirmDialog(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "新增分类") {
            this.addSocategoryAsync();
          } else {
            this.updateSocategoryAsync();
          }
        } else {
          return false;
        }
      });
    },
    // 添加资源分类请求
    async addSocategoryAsync() {
      let params = {
        socategoryName: this.form.socategoryName,
      };
      const data = await addSocategory(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("confirmCloseDialog");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.$emit("closeDialog");
      }
    },
    // 更新资源分类
    async updateSocategoryAsync() {
      let params = {
        socategoryId: this.form.socategoryId,
        socategoryName: this.form.socategoryName,
      };
      const data = await updateSocategory(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("confirmCloseDialog");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.$emit("closeDialog");
      }
    },
  },
};
</script>