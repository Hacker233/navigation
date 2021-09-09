<template>
  <div class="user-manage-box">
    <!-- 头部区域 -->
    <div class="user-title"></div>
    <!-- 表格区域 -->
    <div class="user-table">
      <user-table
        :userList="userList"
        @updataUserList="updataUserList"
      ></user-table>
    </div>
  </div>
</template>
<script>
import { queryUser } from "@/http/api/user";
import UserTable from "./components/UserTable.vue"; // 表格
export default {
  data() {
    return {
      userList: [],
    };
  },
  components: {
    UserTable,
  },
  mounted() {
    // 初始化用户列表
    this.queryUser();
  },
  methods: {
    // 查询用户列表
    async queryUser() {
      const data = await queryUser();
      if (data.code === "00000") {
        this.userList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 更新用户列表
    updataUserList() {
      this.queryUser();
    },
  },
};
</script>
<style lang="scss" scoped>
.user-manage-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}
</style>