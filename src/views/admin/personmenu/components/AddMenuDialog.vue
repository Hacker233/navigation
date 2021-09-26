<template>
  <div class="add-iconfont-dialog-box">
    <el-dialog
      :title="title"
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
          <div class="menu-icon-box">
            <i
              v-if="form.usermenuIcon"
              :class="['menu-icon iconfont', form.usermenuIcon]"
            ></i>
            <el-button type="text" @click="selectIconfont">选择图标</el-button>
          </div>
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
    <icon-panel
      :iconPanelDialogVisible="iconPanelDialogVisible"
      @cancelIconDialog="cancelIconDialog"
      @confirmIconDialog="confirmIconDialog"
    ></icon-panel>
  </div>
</template>
<script>
import { addUsermenu, updateUsermenu } from "@/http/api/usermenu";
import IconPanel from "@/components/IconPanel/IconPanel"; // 菜单选择弹窗
export default {
  props: {
    addMenuDialogVisible: {
      type: Boolean,
      default: false,
    },
    // 标题
    title: {
      type: String,
      default: "新增用户菜单",
    },
    // 回显信息
    baseInfo: {
      default: "",
    },
  },
  components: {
    IconPanel,
  },
  data() {
    return {
      iconPanelDialogVisible: false,
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
    // 取消新增
    closeFirstDialog() {
      this.form = {
        usermenuOrder: "", // 菜单顺序
        usermenuName: "", // 菜单名称
        usermenuRouter: "", // 菜单路由
        usermenuRole: "", // 菜单角色
        usermenuIcon: "", // 菜单图标
      };
      this.$emit("closeFirstDialog");
    },
    // 打开图标选择弹窗
    selectIconfont() {
      this.iconPanelDialogVisible = true;
    },
    // 取消图标选择弹窗
    cancelIconDialog() {
      this.iconPanelDialogVisible = false;
    },
    // 确定图标选择弹窗
    confirmIconDialog(iconfontInfo) {
      this.form.usermenuIcon = iconfontInfo.iconfont_class;
      this.iconPanelDialogVisible = false;
      this.$forceUpdate();
    },
    confirmFirstDialog(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.baseInfo) {
            // 编辑菜单
            this.updateMenu();
          } else {
            this.addMenu();
          }
        } else {
          return false;
        }
      });
    },
    // 编辑菜单
    async updateMenu() {
      this.btnIsLoadgin = true;
      let params = {
        usermenuId: this.form.usermenuId,
        usermenuOrder: this.form.usermenuOrder,
        usermenuName: this.form.usermenuName,
        usermenuRouter: this.form.usermenuRouter,
        usermenuRole: this.form.usermenuRole,
        usermenuIcon: this.form.usermenuIcon,
      };
      const data = await updateUsermenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.$emit("confirmUpdateDialog");
        this.btnIsLoadgin = false;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnIsLoadgin = false;
      }
    },
    // 新增菜单
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
<style lang="scss" scoped>
.menu-icon-box {
  display: flex;
  align-items: center;
  .menu-icon {
    margin-right: 20px;
    font-size: 30px;
  }
}
</style>