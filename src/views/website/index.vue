<template>
  <div class="website-box">
    <div class="content">
      <!-- 搜索区域 -->
      <div class="search"></div>
      <!-- 链接区域 -->
      <div class="link-box" v-for="(item, index) of websitList" :key="index">
        <!-- 头部 -->
        <div class="link-title">
          <i :class="['iconfont', title_icon]"></i>
          <span>{{ item.website_category }}</span>
        </div>
        <div class="card-box">
          <link-card
            v-for="(subItem, subIndex) of item.list"
            :key="subIndex"
            :websiteInfo="subItem"
          >
            <div slot="hot-icon" class="hot-icon" v-if="subIndex <= 2">
              <i class="iconfont pig-remen"></i>
            </div>
          </link-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LinkCard from "@/components/LinkCard/LinkCard.vue"; // 链接卡片
import { queryMenuWebsite } from "@/http/api/website";
export default {
  components: {
    LinkCard,
  },
  data() {
    return {
      websitList: [],
      title_icon: this.$route.query.menuIcon,
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
.website-box {
  width: 100%;
  padding-top: 40px;
  flex: 1;
  box-sizing: border-box;
  .content {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .link-box {
      width: 100%;
      background: #fff;
      padding: 0 20px 20px 20px;
      box-sizing: border-box;
      border-radius: 5px;
      margin-bottom: 25px;
      .link-title {
        border-bottom: 2px rgba(0, 0, 0, 0.02) solid;
        height: 48px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
        .iconfont {
          margin-right: 15px;
          font-size: 20px;
        }
        span {
          font-size: 16px;
          font-weight: 800;
        }
      }
      .card-box {
        display: flex;
        grid-template-columns: repeat(auto-fit, minmax(257px, 1fr));
        grid-column-gap: 40px;
        justify-content: space-between;
        flex-wrap: wrap;
        & :after {
          content: "";
          flex: auto;
        }
        .hot-icon {
          position: absolute;
          top: -10px;
          left: -10px;
          .pig-remen {
            color: red;
            font-size: 25px;
          }
        }
      }
    }
  }
}
</style>