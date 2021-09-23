<template>
  <div class="table-box">
    <el-table
      :data="userList"
      style="width: 100%; margin-bottom: 20px"
      row-key="menu_id"
      border
      stripe
    >
      <el-table-column prop="uid" label="用户id" sortable> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="email" label="邮箱地址"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="signature" label="个性签名"> </el-table-column>
      <el-table-column prop="avatar" label="用户头像">
        <template slot-scope="scope">
          <el-avatar class="avatar" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="register_time" label="注册时间"> </el-table-column>
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
    <!-- 编辑弹窗 -->
    <edit-user-dialog
      :editUserDialogVisible="editUserDialogVisible"
      :baseInfo="baseInfo"
      @closeUserEditDialog="closeUserEditDialog"
      @confirmEditDialog="confirmEditDialog"
    ></edit-user-dialog>
  </div>
</template>
<script>
import EditUserDialog from "./EditUserDialog";
import { deleteUser } from "@/http/api/user";
export default {
  props: {
    userList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      editUserDialogVisible: false,
      baseInfo: "", // 回显信息
    };
  },
  components: {
    EditUserDialog,
  },
  methods: {
    // 编辑用户
    handleEdit(index, item) {
      this.baseInfo = {
        uid: item.uid, // 用户id
        username: item.username, // 用户名
        email: item.email, // 邮箱地址
        role: item.role, // 角色
        avatar: item.avatar, // 头像
      };
      this.editUserDialogVisible = true;
    },
    // 取消编辑
    closeUserEditDialog() {
      this.baseInfo = "";
      this.editUserDialogVisible = false;
    },
    // 确定按钮
    confirmEditDialog() {
      this.editUserDialogVisible = false;
      this.$emit("updataUserList");
    },

		// 删除用户
		async handleDelete(index, item) {
			let params = {
				uid: item.uid
			}
			const data = await deleteUser(params);
      if (data.code === "00000") {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.$emit("updataUserList");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
		}
  },
};
</script>