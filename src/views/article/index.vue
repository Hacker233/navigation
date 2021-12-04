<template>
  <div class="article-content-index-box">
    <!-- 文章文章内容 -->
    <div class="article-left-box">
      <article-content></article-content>
    </div>
    <!-- 右侧区域 -->
    <div class="right-box">
      <!-- 公众号关注盒子 -->
      <right-box></right-box>
    </div>
  </div>
</template>
<script>
import ArticleContent from "./components/ArticleContent";
import RightBox from "./components/RightBox.vue";
export default {
  components: {
    ArticleContent,
    RightBox,
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
    background-color: #fff;
    position: sticky;
    top: 50px;
  }
}
</style>