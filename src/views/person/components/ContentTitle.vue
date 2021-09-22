<template>
  <div class="content-title">
    <div class="left">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "基础资料",
    },
  },
};
</script>
<style lang="scss" scoped>
.content-title {
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    h1 {
      font-size: 18px;
    }
  }
}
</style>