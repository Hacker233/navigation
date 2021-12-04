<template>
  <div
    class="link-card-box"
    @click="toLink(websiteInfo.website_link, websiteInfo.website_id)"
  >
    <slot name="hot-icon"></slot>
    <!-- 直达链接 -->
    <span
      class="to-link"
      @click.stop="toLink(websiteInfo.website_link, websiteInfo.website_id)"
    >
      <i class="iconfont pig-ziyuan"></i>
    </span>
    <!-- <a class="to-link" :href="websiteInfo.website_link" target="blank">
      <i class="iconfont pig-ziyuan"></i>
    </a> -->
    <div class="card-top">
      <div class="favicon">
        <img :src="websiteInfo.website_favicon" alt="" />
      </div>
      <div class="movie-title">
        <h1 :title="websiteInfo.website_title">
          {{ websiteInfo.website_title }}
        </h1>
        <div class="tags-link">
          <el-tag type="success" size="mini">{{
            websiteInfo.website_tags
          }}</el-tag>
        </div>
      </div>
    </div>
    <!-- 网站简介 -->
    <div class="movie-abstract">
      <div class="content">
        <p :title="websiteInfo.website_abstract">
          <span>简介：</span>{{ websiteInfo.website_abstract }}
        </p>
      </div>
    </div>
    <!-- 浏览量等信息 -->
    <div class="views-box">
      <!-- 浏览量 -->
      <div class="views">
        <i class="iconfont pig-liulan"></i>
        <span>{{ websiteInfo.website_views || 0 }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { queryWebsiteById } from "@/http/api/website";
export default {
  props: {
    websiteInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 跳转到内嵌网页
    toIframeWeb() {
      this.$router.push({
        path: "/iframewweb",
        query: {
          url: this.websiteInfo.website_link,
        },
      });
    },
    // 跳转新的标签页
    async toLink(url, id) {
      window.open(url);
      // 查询站点详细信息
      let params = {
        websiteId: id,
      };
      const data = await queryWebsiteById(params);
      if (data.code === "00000") {
        return;
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
.link-card-box {
  width: 22%;
  min-width: 220px;
  position: relative;
  height: 120px;
  padding: 10px 10px 0 10px;
  // overflow: hidden;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  cursor: pointer;
  color: #30333c;
  border-radius: 6px;
  border: 1px solid #e4ecf3;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  margin: 0 0 25px 0;
  &:last-child {
    margin-right: auto;
  }
  &:hover {
    transform: translateY(-6px) !important;
    -webkit-transform: translateY(-6px) !important;
    -moz-transform: translateY(-6px) !important;
    box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    -webkit-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    -moz-box-shadow: 0 26px 40px -24px rgba(0, 36, 100, 0.3);
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .to-link {
    font-size: 12px;
    display: flex;
    position: absolute;
    right: 7px;
    top: 5px;
    .iconfont {
      font-size: 16px;
    }
  }
  .card-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    .favicon {
      height: 100%;
      margin-right: 10px;
      display: flex;
      align-items: center;
      img {
        max-width: 30px;
        min-width: 30px;
        max-height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        border: 1px solid #eee;
      }
    }
    .movie-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding-right: 10px;
      height: 100%;
      .tool-item {
        border: none;
      }
      h1 {
        font-size: 12px;
        min-width: 90px;
        max-width: 54%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .tags-link {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        span {
          height: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
        }
      }
    }
  }
  .movie-abstract {
    width: 100%;
    flex: 1 auto;
    display: flex;
    align-items: center;
    color: #a1a7b7;
    .content {
      display: flex;
      p {
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
  .views-box {
    width: 100%;
    flex: 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid #eee;
    margin-top: 5px;
    .views {
      font-size: 13px;
      .pig-liulan {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
}
</style>