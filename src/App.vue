<template>
  <div id="app">
    <nav-bar v-if="isActive"></nav-bar>
    <div class="right-content" v-if="isActive" v-infinite-scroll="load">
      <right-title v-if="$route.meta.showRightTitle"></right-title>
      <template v-if="$route.meta.keepAlive"
        ><keep-alive> <router-view :key="$route.path" /> </keep-alive
      ></template>
      <template v-else>
        <router-view :key="$route.path" />
      </template>
      <!-- footer -->
      <div class="footer-box">
        <p>Copyright © 2021 小猪导航@会飞的猪</p>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >蜀ICP备2020034752号-2</a
        >
      </div>
    </div>
    <!-- github图标 -->
    <github-card></github-card>

    <!-- 提示弹窗 -->
    <el-dialog
      title="91化简"
      :visible.sync="dialogVisible"
      width="555px"
      class="record-dialog"
    >
      <div class="dialog-content">
        <p>
          <span>本网站最新推出：</span
          >一款免费开源的简历制作神器，支持在线制作简历、自定义主题、一键导出超高清PDF简历文件等等。
          除此之外，还免费提供海量精美word简历模板、PPT模板下载。
        </p>
        <a href="https://91huajian.cn" target="_blank" rel="noopener noreferrer">地址：91化简</a>
        <div class="img-box">
          <img src="./assets/images/91huajian.png" alt="" />
        </div>
      </div>
      <div class="footer-box" slot="footer">
        <el-checkbox v-model="checked" @change="handleChange"
          >不在提示</el-checkbox
        >
        <el-button type="primary" @click="goHuajian">立即前往</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import RightTitle from "@/components/RightTitle/RightTitle.vue";
import GithubCard from "@/components/GithubCard/GithubCard";
export default {
  // 控制局部刷新组件
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isActive: true,
      dialogVisible: false,
      checked: false,
    };
  },
  components: {
    NavBar,
    RightTitle,
    GithubCard,
  },
  mounted() {
    let isRecommend91 = localStorage.getItem("recommend91");
    if(isRecommend91 == 'true') {
      this.dialogVisible = false;
    } else {
      this.dialogVisible = true;
    }
  },
  methods: {
    reload() {
      this.isActive = false;
      this.$nextTick(() => {
        this.isActive = true;
      });
    },
    load() {
      console.log("发起请求");
    },
    handleChange(value) {
      localStorage.setItem("recommend91", value);
    },
    // 前往91化简
    goHuajian() {
      window.open("https://91huajian.cn");
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  // height: 100%;
  display: flex;
  min-width: 1400px;
  position: relative;
  flex: 1;
  .right-content {
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    .footer-box {
      height: 40px;
      background-color: rgb(84, 92, 100);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: #fff;
      font-size: 14px;
      flex: none;
      a {
        text-decoration: none;
        color: #fff;
        margin-left: 30px;
      }
      /*包含以下五种的链接*/
      a {
        text-decoration: none;
      }
      /*正常的未被访问过的链接*/
      a:link {
        text-decoration: none;
      }
      /*已经访问过的链接*/
      a:visited {
        text-decoration: none;
      }
      /*鼠标划过(停留)的链接*/
      a:hover {
        text-decoration: none;
      }
      /* 正在点击的链接，鼠标在元素上按下还没有松开*/
      a:active {
        text-decoration: none;
      }
      /* 获得焦点的时候 鼠标松开时显示的颜色*/
      a:focus {
        text-decoration: none;
      }
    }
  }
}
</style>
<style lang="scss">
.record-dialog {
  .el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-content {
    p {
      line-height: 2;
      text-align: justify;
      font-size: 16px;
      margin-bottom: 10px;
      span {
        font-weight: 600;
      }
    }
    a {
      text-decoration: none;
      font-size: 16px;
    }
    .img-box {
      margin-top: 20px;
      img {
        width: 100%;
      }
    }
  }
  .footer-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
