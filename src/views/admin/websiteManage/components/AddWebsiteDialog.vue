<template>
  <el-dialog
    :title="title"
    :visible.sync="addWebsiteDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="所属菜单" prop="menuInfo">
        <!-- 菜单筛选 -->
        <el-cascader
          v-model="form.menuInfo"
          :options="menuListOptions"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="网站分类" prop="websiteCategory">
        <el-input v-model="form.websiteCategory"></el-input>
      </el-form-item>
      <el-form-item label="网站链接">
        <el-input v-model="form.websiteLink"></el-input>
      </el-form-item>
      <el-form-item label="网站简介">
        <el-input v-model="form.websiteAbstract"></el-input>
      </el-form-item>
      <el-form-item label="网站标签">
        <el-input v-model="form.websiteTags"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeAddWebsiteDialog">取 消</el-button>
      <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { addWebsite, updataWebsite } from "@/http/api/website";
export default {
  props: {
    // 显示或隐藏弹窗
    addWebsiteDialogVisible: {
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
      form: {
        menuInfo: [], // 所属菜单相关信息
        websiteCategory: "", // 网站分类
        websiteLink: "", // 网站链接
        websiteAbstract: "", // 网站简介
        websiteTags: "", // 网站标签
      },
      rules: {
        menuInfo: [{ required: true, message: "请选择菜单", trigger: "blur" }],
        websiteCategory: [
          { required: true, message: "请填写分类", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    // 如果有回显信息,则赋值给form
    baseInfo(newVal, oldVal) {
      if (newVal) {
        this.form = this.baseInfo;
        console.log(this.form);
      } else {
        console.log(oldVal);
      }
    },
  },
  computed: {
    // 初始化菜单筛选下拉菜单
    menuListOptions() {
      let options = [];
      this.$store.state.menuList.forEach((item) => {
        if (!item.menu_child.length) {
          options.push({
            value: JSON.stringify(item),
            label: item.menu_name,
          });
        } else {
          let children = item.menu_child.map((item) => {
            return {
              value: JSON.stringify(item),
              label: item.menu_name,
            };
          });
          options.push({
            value: JSON.stringify(item),
            label: item.menu_name,
            children: children,
          });
        }
      });
      return options;
    },
    title() {
      return this.baseInfo ? "更新站点" : "添加站点";
    },
  },
  methods: {
    // 取消新增
    closeAddWebsiteDialog() {
      this.$emit("closeAddWebsiteDialog");
    },
    // 筛选选中得值
    filterMenu() {
      return this.form.menuInfo.length > 1
        ? this.form.menuInfo[1]
        : this.form.menuInfo[0];
    },
    // 点击确定按钮
    confirm(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 添加站点
          if (!this.baseInfo) {
            this.confirmAddWebsiteDialog();
          } else {
            // 更新站点
            this.updataWebsite();
          }
        } else {
          return false;
        }
      });
    },
    // 添加站点
    async confirmAddWebsiteDialog() {
      let menuInfo = JSON.parse(this.filterMenu());
      let params = {
        websiteMenuName: menuInfo.menu_name, // 网站所属菜单名称
        websiteParentMenuId: menuInfo.parent_menu_id, // 网站所属于菜单的父级id
        websiteMenuId: menuInfo.menu_id, // 网站所属菜单id
        websiteCategory: this.form.websiteCategory, // 网站分类
        websiteLink: this.form.websiteLink, // 网站链接
        websiteAbstract: this.form.websiteAbstract, // 网站简介
        websiteTags: this.form.websiteTags, // 网站标签
      };
      const data = await addWebsite(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.$emit("confirmAddWebsiteDialog");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 更新站点
    async updataWebsite() {
      let menuInfo = JSON.parse(this.filterMenu());
      let params = {
        websiteId: this.form.websiteId,
        websiteMenuName: menuInfo.menu_name, // 网站所属菜单名称
        websiteParentMenuId: menuInfo.parent_menu_id, // 网站所属于菜单的父级id
        websiteMenuId: menuInfo.menu_id, // 网站所属菜单id
        websiteCategory: this.form.websiteCategory, // 网站分类
        websiteLink: this.form.websiteLink, // 网站链接
        websiteAbstract: this.form.websiteAbstract, // 网站简介
        websiteTags: this.form.websiteTags, // 网站标签
      };
      const data = await updataWebsite(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("updataWebsiteConfirm");
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