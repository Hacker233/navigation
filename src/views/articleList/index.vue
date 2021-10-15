<template>
  <div class="soft-ware-box">
    <!-- 左侧列表区域 -->
    <div class="left-list">
      <list-card
        v-for="(item, index) in articleList"
        :key="index"
        :articleInfo="item"
      ></list-card>
      <!-- 分页 -->
      <Pagination
        :total="total"
        :pageCount="pageCount"
        @currentChange="currentChange"
      ></Pagination>
    </div>
    <!-- 右侧推荐区域 -->
    <div class="right-record"></div>
  </div>
</template>
<script>
import ListCard from "./components/ListCard.vue";
import { getArticleList } from "@/http/api/article";
import Pagination from "@/components/Pagination/Pagination"; // 分页组件
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
  components: { ListCard, Pagination },
  mounted() {
    this.getArticleListAsync();
  },
  methods: {
    // 更具菜单id获取文章列表
    async getArticleListAsync() {
      let params = {
        menuId: this.$route.query.menuId,
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
      };
      const data = await getArticleList(params);
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
      this.getArticleListAsync();
    },
  },
};
</script>
<style lang="scss" scoped>
.soft-ware-box {
  padding: 20px 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .left-list {
    width: 750px;
    margin-right: 20px;
    background-color: #fff;
    padding: 10px 20px;
  }
  .right-record {
    width: 300px;
    min-height: 300px;
    background-color: #fff;
  }
}
</style>