<template>
  <div class="article-list-card">
    <!-- 用户区域 -->
    <div class="top-auther">
      <div class="left">
        <el-avatar
          class="avatar"
          :size="35"
          :src="articleInfo.article_auther_avatar"
        ></el-avatar>
        <div class="userInfo">
          <span class="username">{{ articleInfo.article_auther }}</span>
          <span class="create-date">{{ articleInfo.article_date }}</span>
        </div>
      </div>
      <!-- 文章标签 -->
      <div class="article-tags">
        <el-tag
          type="success"
          v-for="(item, index) in articleInfo.article_tags"
          :key="index"
          size="mini"
          >{{ item }}</el-tag
        >
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="bottom-content" @click="toArticleDetail">
      <!-- 摘要区域 -->
      <div class="left">
        <h1>{{ articleInfo.article_title }}</h1>
        <div class="abstract">
          <p>{{ articleInfo.article_abstract }}</p>
        </div>
        <div class="like-views-collection">
          <!-- 浏览量 -->
          <div class="views">
            <i class="iconfont pig-liulan"></i>
            <span>{{ articleInfo.article_views }}</span>
          </div>
          <!-- 点赞量 -->
          <div class="likes">
            <i class="iconfont pig-changyong_dianzan"></i>
            <span>{{ articleInfo.article_likes }}</span>
          </div>
        </div>
      </div>
      <!-- 文章封面 -->
      <div class="right">
        <el-image :src="articleInfo.article_cover" fit="fill" lazy></el-image>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    // 跳转至文章详情
    toArticleDetail() {
      let params = {
        articleId: this.articleInfo.article_id,
        articleMenuId: this.articleInfo.article_menu_id,
        articleParentMenuId: this.articleInfo.article_parent_meun_id,
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
.article-list-card {
  width: 100%;
  height: 170px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  .top-auther {
    height: 45px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    .left {
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
          font-size: 14px;
          font-weight: 700;
          color: #333;
          margin-bottom: 2px;
        }
        .create-date {
          font-size: 12px;
          color: #909090;
        }
      }
    }
    .article-tags {
      margin-left: 20px;
      display: flex;
      align-items: flex-start;
      height: 100%;
      padding-top: 10px;
      span {
        margin: 0 5px;
      }
    }
  }
  .bottom-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    flex: 1;
    .left {
      padding: 0 10px 0 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      h1 {
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #1d2129;
        margin-bottom: 8px;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .abstract {
        flex: 1;
        p {
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          color: #86909c;
        }
      }
      // 文章点赞量区域
      .like-views-collection {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        .views {
          margin-right: 20px;
          display: flex;
          align-items: center;
        }
        .likes {
          display: flex;
          align-items: center;
        }
        .iconfont {
          color: #4e5969;
          margin-right: 3px;
        }
        span {
          font-size: 12px;
          color: #4e5969;
        }
      }
    }
    .right {
      height: 100%;
      width: 200px;
      overflow: hidden;
      ::v-deep .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>