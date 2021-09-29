<template>
  <div class="person-data-box">
    <!-- 标题区域 -->
    <content-title title="基础资料"></content-title>
    <!-- 表单区域 -->
    <div class="form-box">
      <el-form
        :model="formData"
        :rules="rules"
        label-position="left"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <span>{{ formData.username }}</span>
        </el-form-item>
        <el-form-item label="个性签名">
          <span>{{ formData.signature }}</span>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <span>{{ formData.email }}</span>
          <span class="update-email" @click="updateEmail">更改邮箱</span>
        </el-form-item>
      </el-form>
      <!-- <div class="form-footer">
        <el-button type="primary">更新</el-button>
      </div> -->
    </div>
    <!-- 更改邮箱弹窗 -->
    
  </div>
</template>
<script>
import ContentTitle from "./ContentTitle.vue";
export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        signature: "",
      },
      rules: {
        username: [
          { required: false, message: "请输入用户名", trigger: "blur,change" },
        ],
      },
    };
  },
  components: {
    ContentTitle,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化用户信息
    init() {
      this.formData.username = this.$store.state.userInfo.username;
      this.formData.email = this.$store.state.userInfo.email;
      this.formData.signature = this.$store.state.userInfo.signature;
    },
    // 打开更改邮箱弹唱
    updateEmail() {
      this.$message.success("卖力开发中");
    },
  },
};
</script>
<style lang="scss" scoped>
.person-data-box {
  .form-box {
    padding: 20px 40px 0 0;
    .demo-ruleForm {
      .update-email {
        margin-left: 20px;
        font-size: 10px;
        color: blue;
        cursor: pointer;
      }
    }
    .form-footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        width: 100px;
        justify-content: center;
        align-items: center;
        letter-spacing: 5px;
      }
    }
  }
}
</style>