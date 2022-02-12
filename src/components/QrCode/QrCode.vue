<template>
  <div class="qr-code-box">
    <!-- 提示文字 -->
    <div class="pop-title">
      <p>关注小程序</p>
      <p>一键获取所有资源</p>
      <p>【科技趣玩】</p>
    </div>
    <!-- 二维码图片 -->
    <div v-viewer class="qr-code">
      <img src="../../assets/images/qrcode.jpg" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.qr-code-box {
  padding-top: 40px;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .pop-title {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      color: #fff;
      font-size: 13px;
      line-height: 1.5;
      user-select: none;
      &:nth-child(1) {
        color: #ccc;
      }
      &:nth-child(2) {
        color: #ccc;
      }
    }
  }
  .qr-code {
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>