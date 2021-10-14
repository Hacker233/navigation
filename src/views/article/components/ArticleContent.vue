<template>
  <div class="article-content-box">
    <!-- 头部区域 -->
    <div class="auther-title">
      <div class="letf-title">
        <el-avatar
          class="avatar"
          :size="45"
          :src="autherInfo.auther_avatar"
        ></el-avatar>
        <div class="userInfo">
          <span class="username">{{ articleInfo.article_auther }}</span>
          <span class="create-date">{{ articleInfo.article_date }}</span>
        </div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="wang-editor-content">
      <!-- 封面图 -->
      <div class="cover">
        <el-image :src="articleInfo.article_cover" lazy fit="fill"></el-image>
      </div>
      <!-- 标题 -->
      <div class="title">
        <h1>{{ articleInfo.article_title }}</h1>
      </div>
      <div class="wang-content" v-html="articleInfo.article_html_content"></div>
    </div>
  </div>
</template>
<script>
import { getArticle } from "@/http/api/article";
export default {
  data() {
    return {
      articleInfo: "",
      autherInfo: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      let params = {
        articleId: this.$route.query.articleId,
      };
      const data = await getArticle(params);
      if (data.code === "00000") {
        this.articleInfo = data.data;
        this.autherInfo = data.data.auther;
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
@import url("../../../styles/article.css");
.article-content-box {
  width: 900px;
  min-height: 500px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  padding: 0 50px 50px 50px;
  .auther-title {
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    .letf-title {
      height: 100%;
      display: flex;
      align-items: center;
      .userInfo {
        height: 100%;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .username {
          font-size: 16px;
          font-weight: 700;
          color: #333;
          margin-bottom: 5px;
        }
        .create-date {
          font-size: 13px;
          color: #909090;
        }
      }
    }
  }
  .wang-editor-content {
    padding: 20px 0;
    .title {
      min-height: 94px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
      h1 {
        font-size: 30px;
      }
    }
    ::v-deep .wang-content {
      /* 表格 */
      table {
        border-collapse: collapse;
      }
      table th,
      table td {
        border: 1px solid #ccc;
        min-width: 50px;
        height: 20px;
        text-align: left;
      }
      table th {
        background-color: #f1f1f1;
        text-align: center;
      }

      /* 代码块 */
      pre > code {
        display: block;
        border: 1px solid hsl(0, 0%, 91%);
        border-radius: 4px 4px;
        text-indent: 0;
        background-color: #fafafa;
        padding: 10px;
        font-size: 14px;
      }

      /* 引用 */
      blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 10px 10px;
        margin: 10px 0;
        background-color: #f1f1f1;
      }

      /* 列表 */
      ul,
      ol {
        margin: 10px 0 10px 20px;
      }

      /* 分割线 */
      hr {
        display: block;
        width: 90%;
        margin: 20px auto;
        border: 0;
        height: 1px;
        background-color: #ccc;
      }
    }
  }
}
</style>