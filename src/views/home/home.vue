<template>
  <div class="home">
    <!-- <home-card :websitList="websitList"></home-card> -->
    <div class="home-content">
      <!-- 搜索标题 -->
      <div class="search-title"></div>
      <!-- 卡片盒子 -->
      <div class="card-content-box">
        <div class="card-box" v-for="(item, index) of websitList" :key="index">
          <div class="title">
            <i :class="['iconfont', title_icon]"></i>
            <span>{{ item.website_category }}</span>
          </div>
          <div class="card-list">
            <div
              class="card"
              v-for="(subItem, subIndex) of item.list"
              :key="subIndex"
              @click.stop="toLink(subItem.website_link)"
            >
              <p>{{ subItem.website_title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryMenuWebsite } from "@/http/api/website";
export default {
  data() {
    return {
      websitList: [],
      title_icon: this.$route.query.menuIcon,
    };
  },
  components: {},
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
    // 跳转新的标签页
    toLink(url) {
      window.open(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding-top: 40px;
  .home-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .card-content-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .card-box {
        width: 30%;
        margin-bottom: 30px;
        .title {
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 0 0 10px;
          font-size: 14px;
          font-weight: 400;
          color: #b7b7b7;
          .iconfont {
            margin-right: 10px;
          }
        }
        .card-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          grid-row-gap: 10px;
          grid-column-gap: 15px;
          justify-content: space-between;
          .card {
            min-width: 120px;
            max-width: 120px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            font-size: 14px;
            color: #6b7184;
            padding: 0 5px;
            cursor: pointer;

            transition: all 0.3s;
            &:hover {
              background: #6b7184;
              color: #fff;
            }
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>