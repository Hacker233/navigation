<template>
  <div class="article-content-index-box">
    <!-- 文章文章内容 -->
    <div class="article-title">
      <article-content></article-content>
    </div>
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
}
</style>