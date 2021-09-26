<template>
  <el-dialog
    title="选择图标"
    :visible.sync="iconPanelDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <div class="iconfont-select-box">
      <div
        :class="['iconfont-box', { active: currentIndex === index }]"
        v-for="(item, index) of iconfontList"
        :key="index"
        @click="selectIconfont(item, index)"
      >
        <i :class="['iconfont', item.iconfont_class]"></i>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelIconDialog">取 消</el-button>
      <el-button
        type="primary"
        @click="confirmIconDialog"
        :disabled="currentIndex === ''"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import { getIconfont } from "@/http/api/iconfont";
export default {
  props: {
    iconPanelDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentIndex: "",
      iconfontList: [],
      iconfontInfo: "", // 选中的图标信息
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化所有图标
    async init() {
      const data = await getIconfont();
      if (data.code === "00000") {
        this.iconfontList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 选中图标
    selectIconfont(item, index) {
      this.iconfontInfo = item;
      this.currentIndex = index;
    },
    // 点击取消
    cancelIconDialog() {
      this.currentIndex = "";
      this.iconfontInfo = "";
      this.$emit("cancelIconDialog");
    },
    // 点击确定
    confirmIconDialog() {
      this.currentIndex = "";
      this.$emit("confirmIconDialog", this.iconfontInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont-select-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .iconfont-box {
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    box-sizing: border-box;
    &:hover {
      border: 1px solid green;
    }
  }
  .active {
    border: 1px solid green;
  }
}
</style>