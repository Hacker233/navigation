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
      <el-table-column prop="website_id" label="网站ID" sortable width="100">
      </el-table-column>
      <el-table-column prop="website_menu_name" label="所属菜单" width="100">
      </el-table-column>
      <el-table-column prop="website_title" label="网站标题" width="200">
        <template slot-scope="scope">
          <el-tooltip
            popper-class="website-abstract-tool"
            effect="light"
            :content="scope.row.website_title"
          >
            <p class="website_title-p">
              {{ scope.row.website_title }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="website_category"
        label="网站分类"
        sortable
        width="120"
      >
      </el-table-column>
      <el-table-column prop="website_tags" label="网站标签" width="100">
      </el-table-column>
      <el-table-column prop="website_link" label="网站链接"> </el-table-column>
      <el-table-column label="网站简介">
        <template slot-scope="scope">
          <el-tooltip
            popper-class="website-abstract-tool"
            effect="light"
            :content="scope.row.website_abstract"
          >
            <p class="website-abstract-p">
              {{ scope.row.website_abstract }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="website_create_time"
        label="网站新增时间"
        width="180"
      >
      </el-table-column>
      <el-table-column label="网站图标" width="100">
        <template slot-scope="scope">
          <img
            class="website_favicon"
            :src="scope.row.website_favicon"
            alt=""
            srcset=""
          />
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
        websiteTitle: item.website_title,
        websiteFavicon: item.website_favicon
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
<style lang="scss" scoped>
.website-table-box {
  .website-abstract-p {
    overflow: hidden;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .website_title-p {
    overflow: hidden;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
<style>
.website-abstract-tool {
  min-width: 20px;
  max-width: 200px;
  line-height: 20px;
}
.website_favicon {
  max-width: 40px;
  max-height: 40px;
}
</style>


