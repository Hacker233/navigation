<template>
  <el-dialog
    :title="title"
    :visible.sync="addSubMenudialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="父级Id" v-if="parentMenuId">
        <el-input :placeholder="parentMenuId" disabled></el-input>
      </el-form-item>
      <el-form-item label="菜单顺序">
        <el-input v-model="form.menuOrder"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="form.menuName"></el-input>
      </el-form-item>
      <el-form-item label="菜单路由">
        <el-input v-model="form.menuRouter"></el-input>
      </el-form-item>
      <el-form-item label="菜单角色">
        <el-select v-model="form.menuRole" placeholder="请选择菜单角色">
          <el-option label="user" value="user"></el-option>
          <el-option label="admin" value="admin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="form.menuIcon"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeSubDialog">取 消</el-button>
      <el-button type="primary" @click="confirmSubDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addSubMenu, updateMenu } from "@/http/api/menu";
export default {
  props: {
    addSubMenudialogVisible: {
      type: Boolean,
      default: false,
    },
    // 父级ID
    parentMenuId: {
      default: "",
    },
    // 回显信息
    baseInfo: {
      default: "",
    },
  },
  data() {
    return {
      form: {
        menuId: "",
        menuOrder: "", // 菜单顺序
        menuName: "", // 菜单名称
        menuRouter: "", // 菜单路由
        menuRole: "", // 菜单角色
        menuIcon: "", // 菜单图标
      },
    };
  },
  computed: {
    title() {
      return this.baseInfo ? "更新菜单" : "添加子菜单";
    },
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
  mounted() {
    console.log("mounted");
  },
  methods: {
    // 取消新增
    closeSubDialog() {
      this.form = {
        menuOrder: "", // 菜单顺序
        menuName: "", // 菜单名称
        menuRouter: "", // 菜单路由
        menuRole: "", // 菜单角色
        menuIcon: "", // 菜单图标
      };
      this.$emit("closeSubDialog");
    },
    // 点击确认按钮
    async confirmSubDialog() {
      if (this.baseInfo) {
        this.updateMenu();
      } else {
        this.addSubMenu();
      }
    },
    // 新增二级级菜单
    async addSubMenu() {
      let params = {
        parentMenuId: this.parentMenuId,
        menuOrder: this.form.menuOrder,
        menuName: this.form.menuName,
        menuRouter: this.form.menuRouter,
        menuRole: this.form.menuRole,
        menuIcon: this.form.menuIcon,
      };
      const data = await addSubMenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("confirmSubDialog");
        // 更新导航栏信息
        this.$store.dispatch("getMenu");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 更新菜单
    async updateMenu() {
      let params = {
        parentMenuId: this.parentMenuId,
        menuId: this.form.menuId, // 菜单id
        menuOrder: this.form.menuOrder,
        menuName: this.form.menuName,
        menuRouter: this.form.menuRouter,
        menuRole: this.form.menuRole,
        menuIcon: this.form.menuIcon,
      };
      const data = await updateMenu(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("confirmSubDialog");
        // 更新导航栏信息
        this.$store.dispatch("getMenu");
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