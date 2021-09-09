<template>
  <div class="website-table-box">
    <el-table
      :data="websiteList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menu_id"
      border
      stripe
      default-expand-all
    >
      <el-table-column prop="website_id" label="网站ID" sortable>
      </el-table-column>
      <el-table-column prop="website_menu_name" label="网站所属菜单">
      </el-table-column>
      <el-table-column prop="website_title" label="网站标题"> </el-table-column>
      <el-table-column prop="website_category" label="网站分类" sortable>
      </el-table-column>
      <el-table-column prop="website_tags" label="网站标签"> </el-table-column>
      <el-table-column prop="website_link" label="网站链接"> </el-table-column>
      <el-table-column prop="website_abstract" label="网站简介">
      </el-table-column>
      <el-table-column prop="website_create_time" label="网站新增时间">
      </el-table-column>
      <el-table-column label="网站图标">
        <template slot-scope="scope">
          <img :src="scope.row.website_favicon" alt="" srcset="" />
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑网站弹窗 -->
    <add-website-dialog
      :addWebsiteDialogVisible="editWebsiteDialogVisible"
      :baseInfo="baseInfo"
      @closeAddWebsiteDialog="closeAddWebsiteDialog"
      @updataWebsiteConfirm="updataWebsiteConfirm"
    ></add-website-dialog>
  </div>
</template>
<script>
import AddWebsiteDialog from "./AddWebsiteDialog"; // 添加站点弹窗

export default {
  props: {
    websiteList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      editWebsiteDialogVisible: false,
      baseInfo: "",
    };
  },
  components: {
    AddWebsiteDialog,
  },
  methods: {
    // 打开编辑弹窗
    handleEdit(index, item) {
      this.editWebsiteDialogVisible = true;
      this.baseInfo = {
        websiteId: item.website_id,
        websiteCategory: item.website_category,
        websiteLink: item.website_link,
        websiteAbstract: item.website_abstract,
        websiteTags: item.website_tags,
      };
    },
    // 删除网站
    handleDelete(index, item) {
      this.$emit("deleteWebsite", item.website_id);
    },
    // 取消
    closeAddWebsiteDialog() {
      this.editWebsiteDialogVisible = false;
    },
    // 更新菜单确认
    updataWebsiteConfirm() {
      this.baseInfo = "";
      this.editWebsiteDialogVisible = false;
      this.$emit("updataWebsiteConfirm");
    },
  },
};
</script>