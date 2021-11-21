<template>
  <div class="article-content-index-box">
    <!-- 文章文章内容 -->
    <div class="article-left-box">
      <article-content></article-content>
    </div>
    <!-- 右侧区域 -->
    <div class="right-box"></div>
  </div>
</template>
<script>
import ArticleContent from "./components/ArticleContent";
export default {
  components: {
    ArticleContent,
  },
};
</script>
<style lang="scss" scoped>
.article-content-index-box {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .article-left-box {
    margin-right: 20px;
  }
  .right-box {
    width: 300px;
    min-height: 300px;
    background-color: #fff;
  }
}
</style>