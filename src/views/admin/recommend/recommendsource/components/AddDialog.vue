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
        <el-tab-pane label="资源">
          <el-table
            :data="sourceList"
            style="width: 100%; margin-bottom: 20px"
            border
            stripe
            max-height="250"
          >
            <el-table-column prop="source_id" label="资源id" width="100">
            </el-table-column>
            <el-table-column prop="source_title" label="资源名称">
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.is_recommend"
                  size="mini"
                  @click="addSource(scope.row)"
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
import { querySourceAllNoPage } from "@/http/api/source.js";
import { addHotSource } from "@/http/api/recommend.js";
export default {
  props: {
    recommendDialogVisible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "选择今日推荐",
    },
  },
  data() {
    return {
      sourceList: [],
    };
  },
  mounted() {
    this.initSource();
  },
  methods: {
    // 初始化所有资源
    async initSource() {
      const data = await querySourceAllNoPage();
      if (data.code === "00000") {
        this.sourceList = data.data;
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
    // 添加今日推荐-资源
    async addSource(item) {
      let params = {
        sourceId: item.source_id, // 项目id
      };
      const data = await addHotSource(params);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.initSource();
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