<template>
  <div class="home-card-box">
    <!-- 标题区域 -->
    <div class="home-list" v-for="(item, index) of websitList" :key="index">
      <div class="card-title">
        <h1 class="title">{{ item.website_category }}</h1>
      </div>
      <div class="card-list">
        <link-card
          v-for="(subItem, subIndex) of item.list"
          :key="subIndex"
          :websiteInfo="subItem"
        ></link-card>
      </div>
    </div>
  </div>
</template>
<script>
import LinkCard from "@/components/LinkCard/LinkCard";
export default {
  props: {
    websitList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    LinkCard,
  },
};
</script>
<style lang="scss" scoped>
.home-card-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  .home-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .card-title {
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 17px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &::after {
          content: "";
          display: flex;
          width: 20px;
          height: 5px;
          background: green;
          margin-top: 5px;
        }
      }
    }
    .card-list {
      width: 70%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      grid-row-gap: 20px;
			margin-bottom: 30px;
    }
  }
}
</style>