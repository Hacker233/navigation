<template>
  <div class="iframe-box">
    <iframe :src="$route.query.url" frameborder="0" scrolling="auto"></iframe>
  </div>
</template>
<style lang="scss" scoped>
.iframe-box {
  width: 100%;
  height: 100%;
  iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
}
</style>