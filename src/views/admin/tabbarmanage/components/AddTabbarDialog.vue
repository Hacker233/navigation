<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="addTabbardialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="tabbar名称" prop="tabbarName">
          <el-input
            v-model="form.tabbarName"
            clearable
            placeholder="请输入tabbar名称"
            :maxlength="4"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="tabbar路径" prop="tabbarPath">
          <el-input
            v-model="form.tabbarPath"
            clearable
            placeholder="请输入tabbar路径"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="tabbar显示" prop="tabbarShow">
          <el-input
            v-model="form.tabbarShow"
            clearable
            placeholder="1-显示  0-不显示"
            :maxlength="1"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="tabbar角色" prop="tabbarRole">
          <el-select v-model="form.tabbarRole" placeholder="请选择tabbar角色">
            <el-option label="user" value="user"></el-option>
            <el-option label="admin" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="tabbar图标" prop="tabbarIconfont">
          <div class="menu-icon-box">
            <i
              v-if="form.tabbarIconfont"
              :class="['menu-icon iconfont', form.tabbarIconfont]"
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
import { addTabbar, updateTabbar } from "@/http/api/tabbar";
import IconPanel from "@/components/IconPanel/IconPanel"; // 菜单选择弹窗
export default {
  props: {
    addTabbardialogVisible: {
      type: Boolean,
      default: false,
    },
    // 回显信息
    baseInfo: {
      default: "",
    },
  },
  computed: {
    title() {
      return this.baseInfo ? "编辑tabbar" : "新增tabbar";
    },
  },
  components: {
    IconPanel,
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
  data() {
    return {
      iconPanelDialogVisible: false, // 图标选择弹窗
      form: {
        tabbarName: "", // 菜单顺序
        tabbarPath: "", // 菜单名称
        tabbarRole: "", // 菜单角色
        tabbarIconfont: "", // 菜单图标
        tabbarShow: "", // 是否显示
      },
      btnIsLoadgin: false,
      rules: {
        tabbarName: [
          { required: true, message: "请填写菜单顺序", trigger: "blur" },
        ],
        tabbarPath: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
        ],
        tabbarRole: [
          { required: true, message: "请选择角色", trigger: "blur" },
        ],
        tabbarIconfont: [
          { required: true, message: "请输入菜单图标", trigger: "blur" },
        ],
        tabbarShow: [
          { required: true, message: "请输入tabbar是否显示", trigger: "blur" },
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
          if (this.baseInfo) {
            this.updateTab();
          } else {
            this.addMenu();
          }
        } else {
          return false;
        }
      });
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
      this.form.tabbarIconfont = iconfontInfo.iconfont_class;
      this.iconPanelDialogVisible = false;
    },
    // 新增
    async addMenu() {
      this.btnIsLoadgin = true;
      let params = {
        tabbarName: this.form.tabbarName,
        tabbarPath: this.form.tabbarPath,
        tabbarRole: this.form.tabbarRole,
        tabbarIconfont: this.form.tabbarIconfont,
        tabbarShow: this.form.tabbarShow,
      };
      const data = await addTabbar(params);
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
    // 更新
    async updateTab() {
      this.btnIsLoadgin = true;
      let params = {
        tabbarId: this.form.tabbarId,
        tabbarName: this.form.tabbarName,
        tabbarPath: this.form.tabbarPath,
        tabbarRole: this.form.tabbarRole,
        tabbarIconfont: this.form.tabbarIconfont,
        tabbarShow: this.form.tabbarShow,
      };
      const data = await updateTabbar(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
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