<template>
  <el-dialog
    title="添加站点"
    :visible.sync="addWebsiteDialogVisible"
    :show-close="false"
    width="30%"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属菜单">
        <el-select v-model="form.menuInfo" placeholder="请选择菜单">
          <template v-for="(item, index) of $store.state.menuList">
            <el-option
              v-if="!item.menu_child.length"
              :label="item.menu_name"
              :value="item"
              :key="index"
            ></el-option>
            <el-option-group v-else :label="item.menu_name" :key="index">
              <el-option
                v-for="(itemChild, index) of item.menu_child"
                :label="itemChild.menu_name"
                :value="itemChild"
                :key="index"
              ></el-option>
            </el-option-group>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="网站分类">
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
      <el-button type="primary" @click="confirmAddWebsiteDialog"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { addWebsite } from "@/http/api/website";
export default {
  props: {
    addWebsiteDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        menuInfo: "", // 所属菜单相关信息
        websiteCategory: "", // 网站分类
        websiteLink: "", // 网站链接
        websiteAbstract: "", // 网站简介
        websiteTags: "", // 网站标签
      },
    };
  },
  methods: {
    // 取消新增
    closeAddWebsiteDialog() {
      this.$emit("closeAddWebsiteDialog");
    },
    // 添加站点
    async confirmAddWebsiteDialog() {
      console.log(this.form);
      let params = {
        websiteMenuName: this.form.menuInfo.menu_name, // 网站所属菜单名称
        websiteParentMenuId: this.form.menuInfo.parent_menu_id, // 网站所属于菜单的父级id
        websiteMenuId: this.form.menuInfo.menu_id, // 网站所属菜单id
        websitecCategory: this.form.websiteCategory, // 网站分类
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
  },
};
</script>