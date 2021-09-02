<template>
  <div class="movie-box">
    <!-- 网站推荐盒子 -->
    <div class="movie-list-mox">
      <!-- 链接列表 -->
      <div class="movie-card">
        <Link-card v-for="(item, index) of 17" :key="index"></Link-card>
      </div>
    </div>
  </div>
</template>
<script>
import LinkCard from "@/components/LinkCard/LinkCard.vue";
export default {
  components: {
    LinkCard,
  },
};
</script>
<style lang="scss" scoped>
.movie-box {
  flex: 1;
  .movie-list-mox {
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .movie-card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(257px, 1fr));
      grid-row-gap: 40px;
      grid-column-gap: 25px;
      place-items: center;
    }
  }
}
</style>