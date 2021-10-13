<template>
  <div class="publish-content-box">
    <wang-editor></wang-editor>
  </div>
</template>
<script>
import wangEditor from "./components/wangEditor";
export default {
  components: {
    wangEditor,
  },
};
</script>
<style lang="scss" scoped>
.publish-content-box {
  position: relative;
}
</style>