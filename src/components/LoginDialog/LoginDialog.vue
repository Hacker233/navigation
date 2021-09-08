<template>
  <el-dialog
    :show-close="false"
    :append-to-body="true"
    :visible.sync="visible"
    top="0"
    width="400px"
    custom-class="login-dialog"
    :lock-scroll="false"
  >
    <!-- 头部区域 -->
    <div slot="title" class="title">
      <div class="exit">
        <i class="el-icon-close" @click="close"></i>
      </div>
    </div>
    <!-- 表单区域 -->
    <div class="login-box">
      <div class="box-card">
        <div class="register-box">
          <template v-if="isLogin">
            <h1 class="register-title">账号注册</h1>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="70px"
              label-position="left"
              class="demo-ruleForm"
              size="small"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="ruleForm.username"
                  autocomplete="off"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input
                  type="email"
                  v-model="ruleForm.email"
                  autocomplete="off"
                  placeholder="请输入电子邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input
                  type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  placeholder="请再次输入密码"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <el-input
                  v-model.number="ruleForm.code"
                  placeholder="请输入6位数的密码"
                ></el-input>
                <el-button
                  type="primary"
                  class="ml10"
                  @click.native="getEmailCode('ruleForm')"
                  :disabled="codeBtnDisabled"
                  >{{ codeMessage }}</el-button
                >
              </el-form-item>
              <!-- <el-form-item>
                <el-checkbox v-model="checked"
                  >勾选《同意用户协议》</el-checkbox
                >
              </el-form-item> -->
              <el-button
                type="primary"
                class="register-button"
                @click="validate('ruleForm')"
                >注册</el-button
              >
              <p class="to-login" @click="toLogin">
                <span>已有账号？立即登录</span>
              </p>
            </el-form>
          </template>
          <!-- 登录 -->
          <template v-else>
            <h1 class="login-title">账号登录</h1>
            <el-input placeholder="请输入邮箱" v-model="formLogin.email">
              <template slot="prepend"
                ><i class="el-icon-user-solid"></i>
              </template>
            </el-input>
            <el-input
              placeholder="请输入密码"
              v-model="formLogin.password"
              type="password"
            >
              <template slot="prepend"
                ><i class="el-icon-s-opportunity"></i>
              </template>
            </el-input>
            <el-button
              type="primary"
              class="register-button"
              @click="userLogin"
              :disabled="loginDisabled"
              >登录</el-button
            >
            <p @click="toLogin">没有账号？去注册</p>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { userRegister, userLogin, emailCode } from "@/http/api/user";
export default {
  data() {
    // 用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 邮箱
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入电子邮箱"));
      } else {
        let isEmail =
          /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
            value
          );
        if (isEmail) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }
    };
    // 密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认密码
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证码
    let validateCode = (rule, value, callback) => {
      callback();
    };
    return {
      visible: false,
      isLogin: true,
      codeMessage: "获取验证码", // 获取验证码按钮
      codeBtnDisabled: false,
      timer: null,
      checked: "",
      formLogin: {
        email: "",
        password: "",
      },
      ruleForm: {
        username: "",
        email: "",
        pass: "",
        checkPass: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  computed: {
    loginDisabled() {
      if (this.formLogin.email === "" || this.formLogin.password === "") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 打开登录弹窗
    open() {
      this.visible = true;
    },
    // 关闭登录弹窗
    close() {
      this.visible = false;
    },
    // 校验注册信息
    validate(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.registerSubmit();
        } else {
          return false;
        }
      });
    },
    // 注册
    async registerSubmit() {
      if (this.ruleForm.code === "") {
        this.$message.error("请输入6位数的验证码");
        return;
      }
      let params = {
        username: this.ruleForm.username,
        password: this.ruleForm.pass,
        email: this.ruleForm.email,
        code: this.ruleForm.code,
      };
      const data = await userRegister(params);
      if (data.code === "00000") {
        clearInterval(this.timer);
        this.$message.success("注册成功");
        this.register(data); // 登录成功回调
        this.close();
      } else {
        clearInterval(this.timer);
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 登录
    async userLogin() {
      let params = {
        email: this.formLogin.email,
        password: this.formLogin.password,
      };
      const data = await userLogin(params);
      if (data.code === "00000") {
        this.$message.success("登录成功");
        this.login(data); // 登录成功回调
        this.close();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 登录注册切换
    toLogin() {
      this.isLogin = !this.isLogin;
    },
    // 获取邮箱验证码
    getEmailCode(formName) {
      let that = this;
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params = {
            email: this.ruleForm.email,
          };
          const data = await emailCode(params);
          if (data.code === "00000") {
            this.$message.success("已发送验证码！");
            this.codeBtnDisabled = true;
            let time = 60;
            // 按钮60s倒计时
            that.timer = setInterval(function () {
              console.log("执行定时器");
              if (time > 0) {
                that.codeMessage = time + "s";
                time--;
              } else {
                that.codeMessage = "获取验证码";
                that.codeBtnDisabled = false;
                clearInterval(that.timer);
              }
            }, 1000);
          } else {
            this.$message({
              message: data.message,
              type: "error",
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  .login-dialog {
    margin: 0;
    ::v-deep.el-dialog__header {
      padding: 0;
    }
    ::v-deep .el-dialog__body {
      padding: 0;
    }
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .exit {
        cursor: pointer;
      }
    }
  }
}
// 登录框样式
.login-box {
  height: 100%;
  width: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  flex: 1 0 auto;
  box-sizing: border-box;
  .box-card {
    width: 400px;
    background-color: #fff;
    position: relative;
    .register-box {
      min-height: 350px;
      margin: 0 auto;
      padding: 0px 0px 20px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      .register-title {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 18px;
      }
      ::v-deep .el-form {
        width: 100%;
      }
      p {
        width: 100%;
        text-align: center;
        cursor: pointer;
        color: rgb(132, 132, 255);
        &:hover {
          color: rgb(90, 90, 255);
        }
      }
      .register-button {
        width: 100%;
      }
      .login-title {
        margin: 0 auto;
        font-size: 18px;
      }
      .register-button {
        width: 100%;
      }
      .to-login {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        span {
          cursor: pointer;
          & :hover {
            color: #669;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-dialog .el-dialog__body {
  padding: 0px 20px 0 20px;
}
.register-box .el-form-item__content {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>
