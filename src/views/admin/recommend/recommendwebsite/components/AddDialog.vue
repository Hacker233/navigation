<template>
  <el-dialog
    :title="title"
    :visible.sync="recommendDialogVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="30%"
  >
    <div class="table-list-box">
      <el-tabs type="border-card">
        <el-tab-pane label="网站">
          <el-table
            :data="websiteList"
            style="width: 100%; margin-bottom: 20px"
            row-key="socategory_id"
            border
            stripe
            max-height="250"
          >
            <!-- <el-table-column prop="website_id" label="网站id" width="50">
            </el-table-column> -->
            <el-table-column prop="website_title" label="网站名称">
            </el-table-column>
            <el-table-column prop="website_menu_name" label="网站所属菜单">
            </el-table-column>
            <el-table-column
              prop="website_category"
              label="网站分类"
            ></el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.is_recommend"
                  size="mini"
                  @click="addWebsite(scope.row)"
                  >添加</el-button
                >
                <el-tag v-else>已推荐</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { queryAllWebsite } from "@/http/api/website.js";
import { addHotWebsite } from "@/http/api/recommend.js";
export default {
  props: {
    recommendDialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "选择热门网站",
    },
  },
  data() {
    return {
      websiteList: [],
    };
  },
  mounted() {
    this.initWebsite();
  },
  methods: {
    // 初始化所有网站
    async initWebsite() {
      const data = await queryAllWebsite();
      if (data.code === "00000") {
        this.websiteList = data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // 取消弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 添加今日推荐-网站
    async addWebsite(item) {
      let params = {
        websiteId: item.website_id, // 项目id
      };
      const data = await addHotWebsite(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.initWebsite();
        this.$emit("updateHotList");
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