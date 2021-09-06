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
      <el-table-column label="网站图标">
        <template slot-scope="scope">
          <img :src="scope.row.website_favicon" alt="" srcset="" />
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="220">
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
  </div>
</template>
<script>
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
    return {};
  },
};
</script>