<template>
  <div class="left-menu-box">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" router>
      <template v-for="(item, index) of userMenuList">
        <el-menu-item :index="item.usermenu_router" :key="index">
          <i class="iconfont" :class="item.usermenu_icon"></i>
          <span slot="title">{{ item.usermenu_name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { getUsermenu } from "@/http/api/usermenu";
export default {
  data() {
    return {
      userMenuList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化菜单
    async init() {
      const data = await getUsermenu();
      if (data.code === "00000") {
        this.userMenuList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.left-menu-box {
  width: 100%;
  ::v-deep .el-menu {
    width: 100%;
    li {
      .iconfont {
        font-size: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>