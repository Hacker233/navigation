<template>
  <div class="editor-container-box">
    <!-- 工具栏 -->
    <div class="pig-toolbar-container">
      <Toolbar
        class="toolbar-container"
        :editorId="editorId"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
    </div>

    <!-- 编辑器 -->
    <div class="pig-editor-container">
      <div class="editor-box">
        <div class="title-container">
          <input type="text" v-model.trim="title" placeholder="请输入标题" />
        </div>
        <Editor
          class="editor-container"
          :editorId="editorId"
          :defaultConfig="editorConfig"
          :defaultContent="getDefaultContent"
          :mode="mode"
          @onCreated="onCreated"
          @onChange="onChange"
          @onDestroyed="onDestroyed"
          @onFocus="onFocus"
          @onBlur="onBlur"
          @customAlert="customAlert"
          @customPaste="customPaste"
        />
      </div>
      <!-- 发布设置 -->
      <div class="publish-setting-box">
        <!-- 标题 -->
        <div class="publish-title">
          <h1>发布文章</h1>
        </div>
        <!-- 表单 -->
        <div class="publish-form">
          <el-form
            :rules="rules"
            ref="ruleForm"
            :model="form"
            label-width="90px"
          >
            <el-form-item label="文章分类:" prop="category">
              <el-tag
                v-for="item of 7"
                :key="item"
                size="medium"
                :hit="false"
                :class="[
                  'category-tag',
                  { 'category-tag-active': form.category === item },
                ]"
                @click="chooseCatefory(item)"
                >标签一</el-tag
              >
            </el-form-item>

            <el-form-item label="所属菜单:" prop="menuInfo">
              <el-cascader
                size="small"
                v-model="form.menuInfo"
                :options="menuListOptions"
                :show-all-levels="false"
                @change="changeOwnMenu"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="添加标签:" prop="dynamicTags">
              <el-tag
                class="tags"
                :key="tag"
                v-for="tag in form.dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <!-- 标签数目超过3个则不允许添加 -->
              <template v-if="form.dynamicTags.length < 3">
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  :maxlength="10"
                  show-word-limit
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >添加标签</el-button
                >
              </template>
            </el-form-item>

            <el-form-item label="文章封面:">
              <el-upload
                class="avatar-uploader"
                :action="uploadAddress()"
                :headers="{ Authorization: $store.state.token }"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="编辑摘要:" prop="abstract">
              <el-input
                v-model="form.abstract"
                placeholder="请输入内容"
                type="textarea"
                maxlength="50"
                :show-word-limit="true"
                :autosize="{ minRows: 4, maxRows: 8 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="publish-button-box">
          <el-button type="primary" @click="publishArticle('ruleForm')"
            >发布</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css";
import env from "@/config/index";
import { publishArticle } from "@/http/api/article";
import {
  Editor,
  Toolbar,
  getEditor,
  removeEditor,
} from "@wangeditor/editor-for-vue";
import cloneDeep from "lodash.clonedeep";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editorId: "w-e-1",
      toolbarConfig: {
        /* 工具栏配置 */
        excludeKeys: ["fullScreen"], // 需要去除的菜单
      },
      defaultContent: [],
      editorConfig: {
        placeholder: "开始你的创作吧",
        scroll: false,
        // 其他编辑器配置
        // 菜单配置
      },
      mode: "default", // or 'simple'
      curContent: [],
      // 用户产生的数据
      title: "",
      content: "",
      htmlContent: "",
      form: {
        category: "", // 分类
        menuInfo: [], // 所属菜单相关信息
        abstract: "", // 摘要
        imageUrl: "", // 封面图
        dynamicTags: [], // 标签
      },
      inputVisible: false,
      inputValue: "", // 标签输入框的值
      rules: {
        category: [
          { required: true, message: "请选择分类", trigger: "change" },
        ],
        menuInfo: [
          { required: true, message: "请选择所属菜单", trigger: "change" },
        ],
        dynamicTags: [
          { required: true, message: "请添加标签", trigger: "change" },
        ],
        abstract: [
          { required: true, message: "请编写文章摘要", trigger: "change" },
        ],
      },
    };
  },

  computed: {
    // 注意，深度拷贝 content ，否则会报错
    getDefaultContent() {
      return cloneDeep(this.defaultContent);
    },
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

  methods: {
    // 发表文章
    publishArticle(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!this.title) {
            this.$message({
              message: "文章标题不能为空",
              type: "error",
            });
          } else if (this.content) {
            this.$message({
              message: "文章内容不能为空",
              type: "error",
            });
          } else {
            this.publishArticleAsync(); // 发布文章
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 所属菜单——筛选选中得值
    filterMenu() {
      return this.form.menuInfo.length > 1
        ? this.form.menuInfo[1]
        : this.form.menuInfo[0];
    },
    // 发布文章请求
    async publishArticleAsync() {
      let menuInfo = JSON.parse(this.filterMenu());
      let params = {
        articleTitle: this.title, // 文章标题
        articleContent: this.content, // 文章内容
        articleHtmlContent: this.htmlContent, // 文章HTML内容
        articleCategory: this.form.category, // 文章分类
        articleMenuName: menuInfo.topmenu_name, // 文章所属菜单名称
        articleParentMenuId: menuInfo.parent_topmenu_id, // 文章所属于菜单的父级id
        articleMenuId: menuInfo.topmenu_id, // 文章所属菜单id
        articleTags: this.form.dynamicTags, // 文章标签
        articleCover: this.form.imageUrl, // 文章封面地址
        articleAbstract: this.form.abstract, // 文章摘要
      };
      const data = await publishArticle(params);
      if (data.code === "00000") {
        this.$message({
          message: "发布成功",
          type: "success",
        });
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    /*********添加分类**********/
    // 选择分类
    chooseCatefory(item) {
      this.form.category = item;
    },
    /*********添加标签**********/
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    /*********所属菜单**********/
    changeOwnMenu(value) {
      console.log(value);
    },
    /*********文章封面**********/
    // 上传封面地址
    uploadAddress() {
      return env.serverAddress + "/api/upload";
    },
    handleAvatarSuccess(res) {
      this.form.imageUrl = res.data.fileUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },

    onCreated(editor) {
      console.log("onCreated", editor);
    },
    onChange(editor) {
      this.content = JSON.stringify(editor.children);
      this.htmlContent = editor.getHtml();
      this.curContent = editor.children;
      console.log("this.curContent", this.curContent);
    },
    onDestroyed(editor) {
      console.log("onDestroyed", editor);
    },
    // 编辑器聚焦
    onFocus(editor) {
      console.log("onFocus", editor);
    },
    // 编辑器失去焦点
    onBlur(editor) {
      console.log("onBlur", editor);
    },
    customAlert(info, type) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    customPaste(editor, event, callback) {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 返回值（注意，vue 事件的返回值，不能用 return）
      callback(false); // 返回 false ，阻止默认粘贴行为
      // callback(true) // 返回 true ，继续默认的粘贴行为
    },
  },

  // 及时销毁 editor
  beforeDestroy() {
    const editor = getEditor(this.editorId);
    if (editor == null) return;

    // 销毁，并移除 editor
    editor.destroy();
    removeEditor(this.editorId);
  },
};
</script>
<style lang="scss" scoped>
.editor-container-box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  .pig-toolbar-container {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 1000;
    .toolbar-container {
      display: flex;
      align-items: center;
    }
  }
  .pig-editor-container {
    display: flex;
    padding: 30px 20px;
    justify-content: center;
    align-items: flex-start;
    .editor-box {
      background-color: #fff;
      padding: 20px 50px 50px 50px;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      .title-container {
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e8;
        input {
          font-size: 30px;
          border: 0;
          outline: none;
          width: 100%;
          line-height: 1;
        }
      }
    }
    .editor-container {
      width: 800px;
      min-height: 700px;
      background-color: #fff;
      ::v-deep .w-e-text-container {
        min-height: 700px;
        .w-e-scroll {
          min-height: 700px;
          #w-e-textarea-1 {
            min-height: 700px;
          }
        }
      }
    }
    .publish-setting-box {
      width: 390px;
      padding: 0 0 20px 0;
      margin: 0 0 0 20px;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      position: sticky;
      top: 80px;
      .publish-title {
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 0 0 10px;
        h1 {
          font-size: 16px;
        }
      }
      .publish-form {
        padding: 10px;
        .category-tag {
          margin-right: 10px;
          user-select: none;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: #67696b;
            color: #fff;
          }
        }
        .category-tag-active {
          background-color: #67696b;
          color: #fff;
        }
        .tags {
          margin-right: 10px;
        }
        .button-new-tag {
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 90px;
          vertical-align: bottom;
        }
        // 文章封面
        ::v-deep .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 220px;
          height: 130px;
          line-height: 131px;
          text-align: center;
        }
        .avatar {
          width: 220px;
          height: 130px;
          display: block;
        }
      }
      .publish-button-box {
        display: flex;
        justify-content: center;
        button {
          width: 100px;
        }
      }
    }
  }
}
</style>