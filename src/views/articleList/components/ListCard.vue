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
    </div>
    <!-- 内容区域 -->
    <div class="bottom-content" @click="toArticleDetail">
      <div class="left">
        <h1>{{ articleInfo.article_title }}</h1>
        <div class="abstract">
          <p>{{ articleInfo.article_abstract }}</p>
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
      this.$router.push({
        name: "article",
        query: params,
      });
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
  }
  .bottom-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
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
        p {
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          color: #86909c;
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