<template>
  <div class="home">
    <home-card :websitList="websitList"></home-card>
  </div>
</template>
<script>
import HomeCard from "./components/HomeCard.vue";
import { queryMenuWebsite } from "@/http/api/website";
export default {
  data() {
    return {
      websitList: [],
    };
  },
  components: {
    HomeCard,
  },
  mounted() {
    this.queryMenuWebsite();
  },
  methods: {
    // 获取所有站点
    async queryMenuWebsite() {
      let params = {
        menuId: this.$route.query.menuId || 11,
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
.home {
  padding: 20px;
}
</style>