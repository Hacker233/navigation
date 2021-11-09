<template>
  <div class="article-table">
    <el-table
      :data="articleList"
      style="width: 100%; margin-bottom: 20px"
      border
    >
      <el-table-column prop="article_id" label="文章id" sortable>
      </el-table-column>
      <el-table-column prop="article_menu_name" label="文章菜单名">
      </el-table-column>
      <el-table-column prop="article_title" label="文章标题"> </el-table-column>
      <el-table-column prop="article_auther" label="文章作者">
      </el-table-column>
      <el-table-column prop="article_date" label="文章发布日期">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
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
    articleList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    handleDelete(index, row) {
      this.$emit("deleteArticle", row);
    },
  },
};
</script>