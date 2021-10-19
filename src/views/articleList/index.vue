<template>
  <div class="soft-ware-box">
    <!-- 左侧列表区域 -->
    <div class="left-list">
      <!-- 文章筛选 -->
      <div class="screen-box">
        <ul>
          <li
            v-for="(item, index) in sortList"
            :key="index"
            @click="selectSort(item.sort)"
            :class="[{ active: sort === item.sort }]"
          >
            <i :class="['iconfont', item.iconfontClass]"></i>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <!-- 文章列表 -->
      <el-skeleton :rows="4" animated :loading="!articleList.length" />
      <template>
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
      </template>
    </div>
    <!-- 右侧推荐区域 -->
    <div class="right-record">
      <!-- 热榜 -->
      <hot-list></hot-list>
    </div>
  </div>
</template>
<script>
import ListCard from "./components/ListCard.vue";
import { getArticleList } from "@/http/api/article";
import Pagination from "@/components/Pagination/Pagination"; // 分页组件
import HotList from "./components/HotList"; // 热榜
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
      sort: "new", // 排序规则：最新-hot、热门-hot、点赞最多-like
      sortList: [
        {
          sort: "new",
          label: "最新",
          iconfontClass: "pig-zuixingengxin",
        },
        {
          sort: "hot",
          label: "热门",
          iconfontClass: "pig-ico_zonghexinxi_xuanzhong",
        },
        {
          sort: "like",
          label: "最多点赞",
          iconfontClass: "pig-changyong_dianzan",
        },
      ],
    };
  },
  components: { ListCard, Pagination, HotList },
  mounted() {
    this.getArticleListAsync();
  },
  methods: {
    // 根据菜单id获取文章列表
    async getArticleListAsync() {
      this.articleList = [];
      let params = {
        menuId: this.$route.query.menuId,
        sort: this.sort,
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
    // 筛选
    selectSort(value) {
      this.sort = value;
      this.getArticleListAsync();
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
    .screen-box {
      width: 100%;
      height: 40px;
      /* border-bottom: 1px solid #ccc; */
      margin-bottom: 10px;
      position: sticky;
      top: 50px;
      background: #fff;
      z-index: 1;
      ul {
        display: flex;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        height: 100%;
        .active {
          color: green;
        }
        li {
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          &:hover {
            color: green;
          }
          &:nth-child(2) {
            margin: 0 20px;
          }
          .iconfont {
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .right-record {
    width: 300px;
    min-height: 300px;
    position: sticky;
    top: 70px;
  }
}
</style>