<template>
  <div class="iconfont-card-box">
    <div class="iconfont-top">
      <i :class="['iconfont', iconfontInfo.iconfont_class]"></i>
      <span class="iconfont-class">{{ iconfontInfo.iconfont_class }}</span>
    </div>
    <div class="iconfont-bottom">
      <div
        id="copy"
        :data-clipboard-text="iconfontInfo.iconfont_class"
        @click="copy"
        class="bottom-left"
      >
        <span>复制</span>
      </div>
      <div class="bottom-right" @click="deleteIconfont">
        <span>删除</span>
      </div>
    </div>
  </div>
</template>
<script>
import { deleteIconfont } from "@/http/api/iconfont";
import Clipboard from "clipboard";
export default {
  props: {
    iconfontInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    // 复制类名
    copy() {
      let clipboard = new Clipboard("#copy"); // 这里可以理解为选择器，选择上面的复制按钮
      clipboard.on("success", () => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        this.$message({
          message: "手机权限不支持复制功能",
          type: "error",
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    // 删除图标
    async deleteIconfont() {
      let params = {
        iconfontId: this.iconfontInfo.iconfont_id,
      };
      const data = await deleteIconfont(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.$emit("deleteIconfontSuccess");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnIsLoadgin = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.iconfont-card-box {
  width: 130px;
  height: 145px;
  background-color: #fff;
  .iconfont-top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 90px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    box-sizing: border-box;
    .iconfont {
      font-size: 25px;
    }
    .iconfont-class {
      font-size: 14px;
      margin-top: 10px;
      color: green;
    }
  }
  .iconfont-bottom {
    display: flex;
    width: 100%;
    height: 55px;
    .bottom-left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1 auto;
      border-right: 1px solid #eee;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #eee;
      }
      span {
        font-size: 12px;
        color: green;
      }
    }
    .bottom-right {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      flex: 1 auto;
      &:hover {
        background-color: #eee;
      }
      span {
        font-size: 12px;
        color: green;
      }
    }
  }
}
</style>