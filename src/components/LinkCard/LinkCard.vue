<template>
  <div class="link-card-box" @click="toIframeWeb">
    <!-- 直达链接 -->
    <span class="to-link" @click.stop="toLink(websiteInfo.website_link)">
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
  </div>
</template>
<script>
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
    toLink(url) {
      window.open(url);
    },
  },
};
</script>
<style lang="scss" scoped>
.link-card-box {
  width: 22%;
  min-width: 220px;
  position: relative;
  height: 100px;
  padding: 10px 10px;
  border-radius: 5px;
  overflow: hidden;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-sizing: border-box;
  transition: all 0.3s;
  cursor: pointer;
  color: #30333c;
  &:hover {
    background: #6b7184;
    color: #fff;
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
        border-radius: 50%;
        display: flex;
        align-items: center;
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
}
</style>