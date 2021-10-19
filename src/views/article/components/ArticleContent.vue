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
          <div class="create-date">
            {{ articleInfo.article_date }}
            <span>阅读&nbsp;{{ articleInfo.article_views }}</span>
            <el-tag size="medium" :hit="false" type="success">{{
              articleInfo.article_category
            }}</el-tag>
          </div>
        </div>
      </div>
      <div class="right-title">
        <el-button type="primary" @click="editArticle" size="small"
          >编辑</el-button
        >
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="wang-editor-content">
      <!-- 封面图 -->
      <div class="cover">
        <img :src="articleInfo.article_cover" />
      </div>
      <!-- 标题 -->
      <div class="title">
        <h1>{{ articleInfo.article_title }}</h1>
      </div>
      <div class="wang-content" v-html="articleInfo.article_html_content"></div>
    </div>
    <!-- 文章标签 -->
    <div class="article-tags-box">
      <span class="tag-group__title">文章标签:</span>
      <el-tag
        v-for="(item, index) in articleInfo.article_tags"
        size="small"
        :key="index"
        type="danger"
      >
        {{ item }}
      </el-tag>
    </div>
    <!-- 点赞区域 -->
    <div class="likes-box">
      <div class="likes">
        <i
          class="iconfont pig-changyong_dianzan"
          :class="[{ isLike: isLike }]"
          @click="likeArticle"
        ></i>
        <span>{{ articleLikes }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle, likeArticle, cancelLikeArticle } from "@/http/api/article";
import Prism from "prismjs";
import "prismjs/themes/prism-coy.css";
export default {
  data() {
    return {
      articleInfo: "", // 文章信息
      autherInfo: "", // 作者信息
      isLike: false, // 是否点赞
      articleLikes: 0, // 点赞数
    };
  },
  mounted() {
    this.init();
    // 设置选中菜单
    this.setRouterMeta();
    this.$nextTick(() => {
      Prism.highlightAll();
    });
  },
  methods: {
    // 初始化
    async init() {
      let params = {
        articleId: this.$route.query.articleId,
      };
      const data = await getArticle(params);
      if (data.code === "00000") {
        this.articleInfo = data.data; // 文章信息
        this.autherInfo = data.data.auther; // 文章作者
        this.articleLikes = data.data.article_likes; // 点赞量
        this.isLike = data.data.isLike; // 是否点赞了该文章
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 设置选中菜单
    setRouterMeta() {
      let topmenuList = this.$store.state.topmenuList;
      let topmenuId = this.$route.query.articleMenuId;
      topmenuList.forEach((item) => {
        if (item.topmenu_id == topmenuId) {
          this.$route.meta.activeMenu = item.topmenu_router;
        } else if (item.topmenu_child.lenth) {
          item.topmenu_child.forEach((itemChild) => {
            if (itemChild.topmenu_id == topmenuId) {
              this.$route.meta.activeMenu = itemChild.topmenu_router;
            }
          });
        }
      });
      console.log("this.$route.meta.activeMenu", this.$route.meta.activeMenu);
    },
    // 点赞或者取消文章
    likeArticle() {
      if (this.isLike) {
        this.cancelLikeArticleAsync();
      } else {
        this.likeArticleAsync();
      }
    },
    // 点赞请求
    async likeArticleAsync() {
      let params = {
        articleId: this.$route.query.articleId,
      };
      const data = await likeArticle(params);
      if (data.code === "00000") {
        this.isLike = true;
        this.articleLikes += 1;
        this.init();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 取消点赞
    async cancelLikeArticleAsync() {
      let params = {
        articleId: this.$route.query.articleId,
      };
      const data = await cancelLikeArticle(params);
      if (data.code === "00000") {
        this.isLike = false;
        this.articleLikes -= 1;
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
@import url("../../../styles/article.css");
.article-content-box {
  width: 850px;
  min-height: 500px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  padding: 0 50px 50px 50px;
  .auther-title {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
          display: flex;
          align-items: center;
          span {
            display: flex;
            align-items: center;
            margin-left: 20px;
          }
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
    .cover {
      display: flex;
      justify-content: center;
      img {
        max-width: 100%;
        min-width: 100%;
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
  // 标签
  .article-tags-box {
    width: 100%;
    height: 70px;
    border-top: 1px solid #ccc;
    display: flex;
    align-items: center;
    .tag-group__title {
      margin-right: 20px;
      font-size: 14px;
    }
    ::v-deep .el-tag {
      margin-right: 10px;
    }
  }
  .likes-box {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .likes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 30px;
        color: #a5a5a5;
        cursor: pointer;
        padding: 12px;
        border: 1px solid #eee;
        border-radius: 50%;
        transition: all 0.3s;
        &:hover {
          background-color: #67696b;
          color: #fff;
        }
      }
      .isLike {
        background-color: #67696b;
        color: #fff;
      }
      span {
        color: #a5a5a5;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }
}
</style>