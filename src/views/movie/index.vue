<template>
  <div class="movie-box">
    <!-- 网站推荐盒子 -->
    <div class="movie-list-mox" v-for="(item, index) of 9" :key="index">
      <!-- 链接标题 -->
      <div class="link-title-content">
        <link-title></link-title>
      </div>
      <!-- 链接列表 -->
      <div class="movie-card">
        <Link-card v-for="(item, index) of 17" :key="index"></Link-card>
      </div>
    </div>
  </div>
</template>
<script>
import LinkCard from "@/components/LinkCard/LinkCard.vue"; // 链接卡片
import LinkTitle from "@/components/LinkTitle/LinkTitle.vue"; // 标题
export default {
  components: {
    LinkCard,
    LinkTitle,
  },
};
</script>
<style lang="scss" scoped>
.movie-box {
  flex: 1;
  .movie-list-mox {
    width: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .link-title-content {
      display: flex;
    }
    .movie-card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(257px, 1fr));
      grid-row-gap: 40px;
      grid-column-gap: 25px;
      place-items: flex-start;
    }
  }
}
</style>