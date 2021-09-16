<template>
  <div class="person-card">
    <!-- 头像区域 -->
    <div class="avatar-box">
      <el-avatar class="avatar" :size="60" :src="userInfo.avatar"></el-avatar>
    </div>
    <!-- 个人简介区域 -->
    <div class="user-info-box">
      <div class="signature">
        <span>个性签名：</span>
        <span>{{ userInfo.signature || "无个性，不签名！" }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.person-card {
  width: 100%;
  .avatar-box {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
  .user-info-box{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .signature {
      font-size: 13px;
      color: #a1a7b7;
    }
  }
}
</style>