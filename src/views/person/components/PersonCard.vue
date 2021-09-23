<template>
  <div class="person-card">
    <!-- 头像区域 -->
    <div class="avatar-box">
      <el-avatar class="avatar" :size="60" :src="userInfo.avatar"></el-avatar>
      <el-upload
        class="upload-demo"
        :action="uploadAddress()"
        :headers="{ Authorization: $store.state.token }"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-button class="editAvatar" size="small" type="text"
          >修改头像</el-button
        >
      </el-upload>
    </div>
    <!-- 个人简介区域 -->
    <div class="user-info-box">
      <div class="signature">
        <template v-if="!showIpt">
          <span>个性签名：</span>
          <span>{{ signature }}</span>
          <i class="iconfont pig-bianji1" @click="showEditIpt"></i>
        </template>
        <template v-else>
          <el-input
            v-model="value"
            placeholder="请输入内容"
            :maxlength="12"
            show-word-limit
          ></el-input>
          <el-button
            type="text"
            class="signatureConfirm"
            @click="updateSignature"
            >确定</el-button
          >
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { updateSignature, updateAvatar } from "@/http/api/user";
import env from "@/config/index";
export default {
  data() {
    return {
      value: "", // 输入框的值
      signature: this.$store.state.userInfo.signature || "无个性，不签名！",
      showIpt: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {},
  methods: {
    // 上传头像等方法
    uploadAddress() {
      return env.serverAddress + "/upload";
    },
    // 上传成功后
    handleAvatarSuccess(response) {
      let url = response.data.fileUrl;
      this.updateAvatar(url);
    },
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isLt4M;
    },
    // 更改用户头像
    async updateAvatar(url) {
      let params = {
        avatar: url,
      };
      const data = await updateAvatar(params);
      if (data.code === "00000") {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.$store.dispatch("getUserInfo"); // 更新用户信息
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 点击编辑按钮
    showEditIpt() {
      this.value = this.signature;
      this.showIpt = true;
    },
    // 提交更改
    async updateSignature() {
      let params = {
        signature: this.value,
      };
      const data = await updateSignature(params);
      if (data.code === "00000") {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.signature = this.value;
        this.showIpt = false;
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
.person-card {
  width: 100%;
  .avatar-box {
    width: 100%;
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    .upload-demo {
      display: flex;
      .editAvatar {
        padding: 0;
      }
    }
  }
  .user-info-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .signature {
      font-size: 13px;
      color: #a1a7b7;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 95%;
      .signatureConfirm {
        font-size: 12px;
        margin-left: 10px;
      }
      .iconfont {
        font-size: 12px;
        cursor: pointer;
        margin-left: 10px;
        &:hover {
          color: green;
        }
      }
      ::v-deep .el-input__inner {
        height: 30px;
        max-width: 180px;
        margin-right: 10px;
        font-size: 12px;
        padding: 0 5px;
      }
      ::v-deep .el-input__suffix {
        right: 5px;
      }
    }
  }
}
</style>