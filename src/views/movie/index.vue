<template>
  <div class="movie-box">
    <!-- 网站推荐盒子 -->
    <div class="movie-list-mox" v-for="(item, index) of websitList" :key="index">
      <!-- 链接标题 -->
      <div class="link-title-content">
        <link-title :category="item.website_category"></link-title>
      </div>
      <!-- 链接列表 -->
      <div class="movie-card">
        <Link-card v-for="(subItem, subIndex) of item.list" :key="subIndex" :websiteInfo="subItem"></Link-card>
      </div>
    </div>
  </div>
</template>
<script>
import LinkCard from "@/components/LinkCard/LinkCard.vue"; // 链接卡片
import LinkTitle from "@/components/LinkTitle/LinkTitle.vue"; // 标题
import { queryMenuWebsite } from "@/http/api/website";
export default {
  components: {
    LinkCard,
    LinkTitle,
  },
  data() {
    return {
      websitList: [],
    };
  },
  mounted() {
    this.queryMenuWebsite();
  },
  methods: {
    // 获取所有站点
    async queryMenuWebsite() {
      let params = {
        menuId: this.$route.query.menuId,
      };
      const data = await queryMenuWebsite(params);
      if (data.code === "00000") {
        this.websitList = data.data;
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