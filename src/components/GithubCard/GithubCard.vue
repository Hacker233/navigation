<template>
  <div class="github-card-box">
    <i class="iconfont pig-github-fill" @click="toGithub"></i>
  </div>
</template>
<script>
export default {
  data(){
    return {
      url: 'https://github.com/Hacker233'
    }
  },
  methods: {
    toGithub() {
      window.open(this.url,'_blank')
    },
  },
};
</script>
<style lang="scss" scoped>
.github-card-box {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 1px 1px 1px gold;
  cursor: pointer;
  position: fixed;
  bottom: 10px;
  right: 10px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 2px 2px 2px gold;
    background: #6b7184;
    color: #fff;
  }
  .iconfont {
    font-size: 30px;
  }
}
</style>