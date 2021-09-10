<template>
  <div class="link-card-box">
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
          <a :href="websiteInfo.website_link" target="blank">直达网站</a>
        </div>
      </div>
    </div>
    <!-- 网站简介 -->
    <div class="movie-abstract">
      <div class="content">
        <p @click="toIframeWeb" :title="websiteInfo.website_abstract">
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
  },
};
</script>
<style lang="scss" scoped>
.link-card-box {
  width: 250px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.001);
    box-shadow: 0px 0px 6px rgba($color: #000000, $alpha: 0.5);
  }
  .card-top {
    height: 56%;
    width: 100%;
    display: flex;
    .favicon {
      height: 100%;
      width: 34%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
      }
    }
    .movie-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
      padding-right: 10px;
      .tool-item {
        border: none;
      }
      h1 {
        font-size: 14px;
        min-width: 10px;
        max-width: 155px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .tags-link {
        width: 100%;
        display: flex;
        justify-content: space-between;
        a {
          font-size: 12px;
          text-decoration: none;
          color: rgb(172, 172, 238);
        }
      }
    }
  }
  .movie-abstract {
    width: 100%;
    flex: 1 auto;
    display: flex;
    align-items: center;
    .content {
      display: flex;
      padding: 4px 10px;
      p {
        font-size: 12px;
        color: rgb(150, 148, 148);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: rgb(187, 178, 238);
        }
      }
    }
  }
}
</style>