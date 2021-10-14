<template>
  <div class="category-manage-box">
    <!-- 头部 -->
    <div class="title-box">
      <!-- 新增站点 -->
      <el-button type="primary" @click="addCategory">添加分类</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table
      :data="categoryList"
      style="width: 100%; margin-bottom: 20px"
      row-key="category_id"
      border
      stripe
    >
      <el-table-column prop="uid" label="分ID" sortable> </el-table-column>
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

    <!-- 弹窗 -->
    <el-dialog
      :title="modelTitle"
      :visible.sync="categoryDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input
            v-model="form.categoryName"
            clearable
            placeholder="请输入分类名称"
            :maxlength="60"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFirstDialog">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmDialog('ruleForm')"
          :loading="btnIsLoadgin"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList: [],
      modelTitle: "新增",
      categoryDialogVisible: false,
      btnIsLoadgin: false,
      form: {
        categoryName: "",
      },
      rules: {
        categoryName: [
          { required: true, message: "请填写分类名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addCategory() {
      this.categoryDialogVisible = true;
    },
    // 弹窗取消
    closeFirstDialog() {
      this.categoryDialogVisible = false;
    },
    // 弹窗确认
    confirmDialog(formName) {
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addIconfont();
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.category-manage-box {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .title-box {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
  }
}
</style>