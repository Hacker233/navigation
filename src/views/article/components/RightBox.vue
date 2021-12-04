<template>
  <div class="fans-box">
    <div class="header">
      <h1>
        关注不迷路
      </h1>
    </div>
    <div class="img-box">
      <img src="@/assets/images/fans.jpg" alt="">
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fans-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    padding: 0 0 0 10px;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    h1 {
      font-size: 16px;
      user-select: none;
    }
  }
  .img-box {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
    }
  }
}
</style>