<template>
  <div class="hot-list-box">
    <!-- 标题 -->
    <div class="title">
      <h1>热榜</h1>
    </div>
    <!-- 排行榜 -->
    <div class="hot-list">
      <ul>
        <li v-for="(item, index) in articleHotList" :key="index">
          <!-- 奖牌 -->
          <div class="medal-box">
            <!-- 第一名 -->
            <i
              v-if="index === 0"
              class="iconfont pig-jianshen-jiangpai-jinpai pig-1"
            ></i>
            <!-- 第二名 -->
            <i
              v-else-if="index === 1"
              class="iconfont pig-jianshen-jiangpai-jinpai pig-2"
            ></i>
            <!-- 第三名 -->
            <i
              v-else-if="index === 2"
              class="iconfont pig-jianshen-jiangpai-jinpai pig-3"
            ></i>
            <!-- 其它 -->
            <span v-else class="other-rank">{{ index + 1 }}</span>
          </div>
          <!-- 文章 -->
          <div class="article-content">
            <h1 @click="toArticleDetail(item)">{{ item.article_title }}</h1>
          </div>
          <!-- 热度值 -->
          <div class="hot-value">
            <i class="iconfont pig-huo"></i>
            <span class="value">{{ item.article_hot_value }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getArticleList } from "@/http/api/article";
export default {
  data() {
    return {
      articleHotList: [],
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      sort: "hot",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化排行榜
    async init() {
      this.articleHotList = [];
      let params = {
        menuId: this.$route.query.menuId,
        sort: this.sort,
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
      };
      const data = await getArticleList(params);
      if (data.code === "00000") {
        this.articleHotList = data.data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 跳转至文章详情
    toArticleDetail(item) {
      let params = {
        articleId: item.article_id,
        articleMenuId: item.article_menu_id,
        articleParentMenuId: item.article_parent_meun_id,
      };
      let newPage = this.$router.resolve({
        name: "article",
        query: params,
      });
      window.open(newPage.href, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.hot-list-box {
  width: 300px;
  min-height: 300px;
  background-color: #fff;
  .title {
    height: 50px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    h1 {
      font-size: 16px;
    }
  }
  .hot-list {
    padding: 10px 20px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .medal-box {
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          .iconfont {
            font-size: 30px;
          }
          .pig-1 {
            color: rgb(1, 24, 1);
          }
          .pig-2 {
            color: rgb(1, 80, 1);
          }
          .pig-3 {
            color: rgb(2, 119, 2);
          }
          .other-rank {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            color: rgb(119, 119, 119);
          }
        }
        .article-content {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 10px;
          h1 {
            width: 100%;
            max-width: 170px;
            font-size: 14px;
            color: rgb(95, 95, 95);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            cursor: pointer;
            &:hover {
              color: green;
            }
          }
        }
        .hot-value {
          height: 100%;
          width: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .iconfont {
            color: green;
            font-size: 16px;
          }
          .value {
            font-size: 10px;
            color: rgb(114, 114, 114);
          }
        }
      }
    }
  }
}
</style>