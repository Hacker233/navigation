<template>
  <div class="link-card-box">
    <div class="card-top">
      <div class="favicon">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="movie-title">
        <h1>腾讯视频</h1>
        <a href="http://localhost:8080/">跳转网站</a>
      </div>
    </div>
    <!-- 网站简介 -->
    <div class="movie-abstract">
      <div class="content">
        <p>
          <span>简介：</span
          >我是简介我我是简介我是简介我是简介我是简介是简介我是简介我是简介
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.link-card-box {
  width: 250px;
  height: 110px;
  border: 1px solid #ccc;
  // margin-bottom: 40px;
  border-radius: 5px;
	cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 6px rgba($color: #000000, $alpha: 0.5);
  }
  .card-top {
    height: 50%;
    width: 100%;
    display: flex;
    .favicon {
      height: 100%;
      width: 34%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
      }
    }
    .movie-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
      padding-right: 10px;
      h1 {
        font-size: 14px;
      }
      a {
        font-size: 12px;
        text-decoration: none;
        color: rgb(172, 172, 238);
      }
    }
  }
  .movie-abstract {
    width: 100%;
    .content {
      display: flex;
      padding: 4px 10px;
      p {
        font-size: 12px;
        color: rgb(150, 148, 148);
      }
    }
  }
}
</style>