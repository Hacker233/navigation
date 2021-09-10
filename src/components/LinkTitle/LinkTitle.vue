<template>
  <div class="link-title-box">
    <div class="link-title">
      <h1>{{ category }}</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.link-title-box {
  height: 50px;
  margin: 0 0 20px 0;
  box-sizing: border-box;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &::after {
    display: flex;
    content: "";
    width: 25px;
    height: 5px;
    background-color: green;
  }
  .link-title {
    display: flex;
    align-items: center;
    height: 100%;
    h1 {
      font-size: 20px;
    }
  }
}
</style>