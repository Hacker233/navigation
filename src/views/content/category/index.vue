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
      <el-table-column prop="category_id" label="分类ID" sortable>
      </el-table-column>
      <el-table-column prop="category_menu_id" label="所属菜单id" sortable>
      </el-table-column>
      <el-table-column prop="category_menu_parent_id" label="所属菜单父级id" sortable>
      </el-table-column>
      <el-table-column prop="category_menu_name" label="所属菜单名" sortable>
      </el-table-column>
      <el-table-column prop="category_name" label="分类名称"> </el-table-column>
      <!-- 操作列 -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <Pagination
      :total="total"
      :pageCount="pageCount"
      @currentChange="currentChange"
    ></Pagination>

    <!-- 弹窗 -->
    <el-dialog
      :title="modelTitle"
      :visible.sync="categoryDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="所属菜单" prop="menuInfo">
          <el-cascader
            v-model="form.menuInfo"
            :options="menuListOptions"
            :show-all-levels="false"
            @change="changeOwnMenu"
          ></el-cascader>
        </el-form-item>
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
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/http/api/category";
import Pagination from "../../../components/Pagination/Pagination"; // 分页组件
export default {
  data() {
    return {
      categoryList: [],
      modelTitle: "新增",
      categoryDialogVisible: false,
      btnIsLoadgin: false,
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      total: 0, // 总条数
      pageCount: 0, // 总页数
      form: {
        categoryName: "",
        menuInfo: [], // 所属菜单相关信息
      },
      rules: {
        menuInfo: [
          { required: true, message: "请选择所属菜单", trigger: "blur" },
        ],
        categoryName: [
          { required: true, message: "请填写分类名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    // 初始化菜单筛选下拉菜单
    menuListOptions() {
      let options = [];
      this.$store.state.topmenuList.forEach((item) => {
        if (!item.topmenu_child.length) {
          options.push({
            value: JSON.stringify(item),
            label: item.topmenu_name,
          });
        } else {
          let children = item.topmenu_child.map((item) => {
            return {
              value: JSON.stringify(item),
              label: item.topmenu_name,
            };
          });
          options.push({
            value: JSON.stringify(item),
            label: item.topmenu_name,
            children: children,
          });
        }
      });
      return options;
    },
  },
  components: {
    Pagination,
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化表格
    async init() {
      let params = {
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
      };
      const data = await getCategory(params);
      if (data.code === "00000") {
        this.categoryList = data.data.data;
        this.total = data.data.page.count; // 总条数
        this.pageCount = data.data.page.pageCount; // 总页数
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    /*********所属菜单**********/
    changeOwnMenu(value) {
      console.log(value);
    },
    
    addCategory() {
      this.modelTitle = "新增";
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
          if (this.modelTitle === "新增") {
            this.addCategoryAsync();
          } else {
            this.updateCategoryAsync();
          }
        } else {
          return false;
        }
      });
    },
    // 当前页发生变化
    currentChange(currentPage) {
      this.pageParams.page = currentPage; // 更改查询页面
      this.init();
    },
    // 所属菜单——筛选选中得值
    filterMenu() {
      return this.form.menuInfo.length > 1
        ? this.form.menuInfo[1]
        : this.form.menuInfo[0];
    },
    // 新增分类
    async addCategoryAsync() {
      let menuInfo = JSON.parse(this.filterMenu());
      this.btnIsLoadgin = true;
      let parasm = {
        categoryName: this.form.categoryName,
        categoryMenuName: menuInfo.topmenu_name, // 文章所属菜单名称
        categoryMenuParentId: menuInfo.parent_topmenu_id, // 文章所属于菜单的父级id
        categoryMenuId: menuInfo.topmenu_id, // 文章所属菜单id
      };
      const data = await addCategory(parasm);
      if (data.code === "00000") {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.btnIsLoadgin = false;
        this.init();
        this.categoryDialogVisible = false;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnIsLoadgin = false;
        this.init();
        this.categoryDialogVisible = false;
      }
    },
    // 编辑
    handleEdit(row) {
      this.modelTitle = "编辑";
      this.categoryDialogVisible = true;
      this.form = {
        categoryId: row.category_id,
        categoryName: row.category_name,
      };
    },
    // 更新请求
    async updateCategoryAsync() {
      this.btnIsLoadgin = true;
      let parasm = {
        categoryId: this.form.categoryId,
        categoryName: this.form.categoryName,
      };
      const data = await updateCategory(parasm);
      if (data.code === "00000") {
        this.$message({
          message: "修改",
          type: "success",
        });
        this.btnIsLoadgin = false;
        this.init();
        this.categoryDialogVisible = false;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnIsLoadgin = false;
        this.init();
        this.categoryDialogVisible = false;
      }
    },
    // 删除
    async handleDelete(row) {
      let parasm = {
        categoryId: row.category_id,
      };
      const data = await deleteCategory(parasm);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.init();
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.init();
      }
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