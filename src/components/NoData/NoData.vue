<template>
  <div class="no-data-box">
    <i class="iconfont pig-meiyougengduo"></i>
    <p>暂无数据</p>
  </div>
</template>
<style lang="scss" scoped>
.no-data-box {
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .iconfont {
    font-size: 80px;
    margin-bottom: 20px;
    color: green;
  }
  p {
    font-size: 16px;
  }
}
</style>