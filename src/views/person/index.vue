<template>
  <div class="person-box">
    <div class="content-box">
      <!-- 左边侧边栏 -->
      <div class="left">
        <left-menu></left-menu>
      </div>
      <!-- 中间内容区域 -->
      <div class="center"></div>
      <!-- 右侧区域 -->
      <div class="right"></div>
    </div>
  </div>
</template>
<script>
import LeftMenu from "./components/LeftMenu.vue";
export default {
  components: {
    LeftMenu,
  },
};
</script>
<style lang="scss" scoped>
.person-box {
  width: 100%;
  height: 100%;
  .content-box {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 0 0 0;
    .left {
      width: 200px;
      background-color: #fff;
      min-height: 400px;
    }
    .center {
      width: 650px;
      background: #fff;
      min-height: 500px;
    }
    .right {
      background: #fff;
      background-color: #fff;
      min-height: 300px;
      width: 300px;
    }
  }
}
</style>