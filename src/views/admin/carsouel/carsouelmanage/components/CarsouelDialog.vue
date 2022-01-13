<template>
  <div class="source-dialog">
    <el-dialog
      :title="title"
      :visible.sync="carsouelDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="轮播名称" prop="carsouelName">
          <el-input
            v-model="form.carsouelName"
            clearable
            placeholder="请输入轮播名称"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播所属页面" prop="carsouelPage">
          <el-input
            v-model="form.carsouelPage"
            clearable
            placeholder="请输入轮播所属页面"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播跳转链接" prop="carsouelPath">
          <el-input
            v-model="form.carsouelPath"
            clearable
            placeholder="请输入轮播跳转链接"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播跳转参数" prop="carsouelParams">
          <el-input
            v-model="form.carsouelParams"
            clearable
            placeholder="请输入轮播跳转链接，如{articleId:12}"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="上传轮播图">
          <el-upload
            class="avatar-uploader"
            :action="uploadAddress()"
            :headers="{ Authorization: $store.state.token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.carsouelUrl"
              :src="form.carsouelUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import env from "@/config/index";
import { addCarsouel, updateCarsouel } from "@/http/api/carsouel";
export default {
  props: {
    carsouelDialogVisible: { type: Boolean, default: false },
    // 弹窗标题
    title: {
      type: String,
      default: "新增轮播",
    },
    // 回显信息
    baseInfo: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        carsouelId: "",
        carsouelUrl: "", // 轮播图url
        carsouelPage: "", // 轮播图所属页面
        carsouelName: "", // 轮播图名称
        carsouelPath: "", // 轮播图跳转链接
        carsouelParams: "", // 轮播图跳转参数
      },
      rules: {
        carsouelName: [
          { required: true, message: "请输入轮播名称", trigger: "blur" },
        ],
        carsouelPage: [
          { required: true, message: "请输入轮播所属页面", trigger: "blur" },
        ],
        carsouelPath: [
          { required: true, message: "请输入轮播跳转链接", trigger: "blur" },
        ],
        carsouelParams: [
          { required: true, message: "请输入轮播跳转参数", trigger: "blur" },
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
      console.log(this.form);
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "新增轮播") {
            this.addCarsouelAsync();
          } else {
            this.updateCarsouelAsync();
          }
        } else {
          return false;
        }
      });
      this.$emit("closeDialog");
    },
    // 新增资源
    async addCarsouelAsync() {
      let params = this.form;
      const data = await addCarsouel(params);
      if (data.code === "00000") {
        this.$message({
          message: "新增成功",
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
    // 更新资源
    async updateCarsouelAsync() {
      let params = this.form;
      const data = await updateCarsouel(params);
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
    // 上传轮播图地址
    uploadAddress() {
      return env.serverAddress + "/api/upload";
    },
    handleAvatarSuccess(res) {
      this.form.carsouelUrl = res.data.fileUrl;
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
  },
};
</script>
<style lang="scss" scoped>
.source-dialog {
  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 150px;
    display: block;
  }
  .addDownload {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
}
</style>