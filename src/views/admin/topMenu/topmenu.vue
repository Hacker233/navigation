<template>
  <div class="menu-manage-box">
    <!-- 头部 -->
    <div class="menu-manage-title">
      <el-button type="primary" @click="openFirstDialog">新增菜单</el-button>
      <!-- 添加一级菜单弹窗 -->
      <add-first-menu-dialog
        :addFirtstMenudialogVisible="addFirtstMenudialogVisible"
        @closeFirstDialog="closeFirstDialog"
        @confirmFirstDialog="confirmFirstDialog"
      ></add-first-menu-dialog>
    </div>
    <!-- 菜单表格 -->
    <menu-table :menuList="menuList"></menu-table>
  </div>
</template>
<script>
import MenuTable from "./components/MenuTable.vue"; // 表格组件
import AddFirstMenuDialog from "./components/AddFirstMenuDialog.vue";
export default {
  data() {
    return {
      addFirtstMenudialogVisible: false, // 添加一级菜单弹窗
    };
  },
  components: {
    MenuTable,
    AddFirstMenuDialog,
  },
  mounted() {},
  computed: {
    menuList() {
      return this.$store.state.topmenuList;
    },
  },
  methods: {
    // 打开新增一级菜单弹窗
    openFirstDialog() {
      this.addFirtstMenudialogVisible = true;
    },
    // 取消新增一级菜单
    closeFirstDialog() {
      this.addFirtstMenudialogVisible = false;
    },
    // 点击确定关闭增加一级菜单弹窗
    confirmFirstDialog() {
      this.$store.dispatch("getTopmenu");
      this.addFirtstMenudialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-manage-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .menu-manage-title {
    margin-bottom: 20px;
  }
}
</style>