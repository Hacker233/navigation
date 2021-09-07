<template>
  <div class="website-box">
    <!-- 头部 -->
    <div class="title-box">
      <!-- 新增站点 -->
      <el-button type="primary" @click="openaddWebsiteDialog"
        >新增网站</el-button
      >
      <!-- 菜单筛选 -->
      <div class="cascader-box">
        <span>所属菜单：</span>
        <el-cascader
          v-model="selectMenuInfo"
          :options="menuListOptions"
          :show-all-levels="false"
          @change="queryCategory"
        ></el-cascader>
      </div>
      <!-- 分类筛选 -->
      <div class="cascader-box">
        <span>所属分类：</span>
        <el-select v-model="selectCategory" placeholder="请选择菜单角色">
          <el-option
            v-for="(item, index) of categoryList"
            :label="item"
            :value="item"
            :key="index"
          ></el-option>
        </el-select>
      </div>
      <el-button
        type="primary"
        @click="queryMenuCateWebsite"
        :disabled="disabledBtn"
        >查询</el-button
      >
      <el-button type="primary" @click="getWebsitList" :disabled="disabledBtn"
        >清空查询</el-button
      >
      <!-- 新增网站弹窗 -->
      <add-website-dialog
        :addWebsiteDialogVisible="addWebsiteDialogVisible"
        @closeAddWebsiteDialog="closeAddWebsiteDialog"
        @confirmAddWebsiteDialog="confirmAddWebsiteDialog"
      ></add-website-dialog>
    </div>
    <!-- 网站表格 -->
    <div class="website-table">
      <website-table
        :websiteList="websiteList"
        @deleteWebsite="deleteWebsite"
        @updataWebsiteConfirm="updataWebsiteConfirm"
      ></website-table>
    </div>
  </div>
</template>
<script>
import AddWebsiteDialog from "./components/AddWebsiteDialog"; // 添加站点弹窗
import WebsiteTable from "./components/WebsiteTable";
import { queryWebsite, queryCategory, deleteWebsite } from "@/http/api/website";

export default {
  data() {
    return {
      addWebsiteDialogVisible: false,
      websiteList: [],
      selectMenuInfo: [],
      categoryList: [],
      selectCategory: "", // 选中的分类
    };
  },
  components: {
    AddWebsiteDialog,
    WebsiteTable,
  },
  computed: {
    // 查询按钮是否可用
    disabledBtn() {
      return !(this.selectCategory || this.selectMenuInfo.length);
    },
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
  },
  mounted() {
    // 获取网站列表
    this.getWebsitList();
  },
  methods: {
    // 筛选选中得值
    filterMenu() {
      return this.selectMenuInfo.length > 1
        ? this.selectMenuInfo[1]
        : this.selectMenuInfo[0];
    },
    // 打开新增网站弹窗
    openaddWebsiteDialog() {
      this.addWebsiteDialogVisible = true;
    },
    // 点击取消按钮
    closeAddWebsiteDialog() {
      this.addWebsiteDialogVisible = false;
      console.log(this.addWebsiteDialogVisible);
    },
    // 点击确定按钮
    confirmAddWebsiteDialog() {
      this.getWebsitList(); // 更新网站列表
      this.addWebsiteDialogVisible = false;
    },
    handleChange(value) {
      console.log(value);
    },
    // 查询当前菜单的分类列表
    async queryCategory() {
      this.selectCategory = ""; // 先清空分类
      let websiteMenuId = JSON.parse(this.filterMenu());
      let params = {
        websiteMenuId: websiteMenuId.menu_id,
      };
      const data = await queryCategory(params);
      if (data.code === "00000") {
        this.categoryList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 获取所有网站列表
    async getWebsitList() {
      this.selectMenuInfo = [];
      this.selectCategory = "";
      const data = await queryWebsite();
      if (data.code === "00000") {
        this.websiteList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 根据菜单和分类查询网站列表
    async queryMenuCateWebsite() {
      let menuInfo = JSON.parse(this.filterMenu());
      let params = {
        websiteMenuId: menuInfo.menu_id,
        websiteCategory: this.selectCategory,
      };
      const data = await queryWebsite(params);
      if (data.code === "00000") {
        this.websiteList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 删除网站
    async deleteWebsite(item) {
      let params = {
        websiteId: item,
      };
      const data = await deleteWebsite(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        // 如果没有筛选条件则查询全部
        if (!this.disabledBtn) {
          this.queryMenuCateWebsite();
        } else {
          this.getWebsitList();
        }
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 更新站点
    updataWebsiteConfirm() {
      // 如果没有筛选条件则查询全部
      if (!this.disabledBtn) {
        this.queryMenuCateWebsite();
      } else {
        this.getWebsitList();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.website-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .title-box {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .cascader-box {
      display: flex;
      align-items: center;
      min-width: 150px;
      margin: 0 20px;
    }
  }
}
</style>