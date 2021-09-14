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
    <!-- 分页 -->
    <Pagination
      :total="total"
      :pageCount="pageCount"
      @currentChange="currentChange"
    ></Pagination>
  </div>
</template>
<script>
import { queryUser } from "@/http/api/user";
import UserTable from "./components/UserTable"; // 表格
import Pagination from "../../../components/Pagination/Pagination"; // 分页组件

export default {
  data() {
    return {
      userList: [],
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      pageCount: 0, // 总页数
    };
  },
  components: {
    UserTable,
    Pagination,
  },
  mounted() {
    // 初始化用户列表
    this.queryUser();
  },
  methods: {
    // 查询用户列表
    async queryUser() {
      let params = this.pageParams;
      const data = await queryUser(params);
      if (data.code === "00000") {
        this.userList = data.data.data;
        this.total = data.data.page.count; // 总条数
        this.pageCount = data.data.page.pageCount; // 总页数
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
    // 当前页发生变化
    currentChange(currentPage) {
      this.pageParams.page = currentPage; // 更改查询页面
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