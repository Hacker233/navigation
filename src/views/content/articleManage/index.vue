<template>
  <div class="article-list-box">
    <!-- 表格 -->
    <manage-table
      :articleList="articleList"
      @deleteArticle="deleteArticle"
    ></manage-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      :pageCount="pageCount"
      @currentChange="currentChange"
    ></Pagination>
  </div>
</template>
<script>
import { queryAllArticleList, deleteArticleById } from "@/http/api/article";
import ManageTable from "./components/ManageTable.vue";
import Pagination from "../../../components/Pagination/Pagination"; // 分页组件
export default {
  data() {
    return {
      articleList: [],
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      pageCount: 0, // 总页数
    };
  },
  components: {
    ManageTable,
    Pagination,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化文章列表
    async init() {
      let params = this.pageParams;
      const data = await queryAllArticleList(params);
      if (data.code === "00000") {
        this.articleList = data.data.data;
        this.total = data.data.page.count; // 总条数
        this.pageCount = data.data.page.pageCount; // 总页数
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 当前页发生变化
    currentChange(currentPage) {
      this.pageParams.page = currentPage; // 更改查询页面
      this.init();
    },
    // 删除文章
    async deleteArticle(row) {
      let params = {
        articleId: row.article_id,
      };
      const data = await deleteArticleById(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.init();
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
<style lang="scss" scoped>
.article-list-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
}
</style>