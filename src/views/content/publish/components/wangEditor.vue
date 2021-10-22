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
          <input
            type="text"
            v-model.trim="title"
            placeholder="请输入标题"
            autocomplete="new-password"
          />
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
                v-for="(item, index) of categoryList"
                :key="index"
                size="medium"
                :hit="false"
                :class="[
                  'category-tag',
                  {
                    'category-tag-active': form.category === item.category_name,
                  },
                ]"
                @click="chooseCatefory(item.category_name)"
                >{{ item.category_name }}</el-tag
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
                maxlength="100"
                :show-word-limit="true"
                :autosize="{ minRows: 4, maxRows: 8 }"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="publish-button-box">
          <el-button
            type="primary"
            @click="publishArticle('ruleForm')"
            :loading="btnIsLoadgin"
            >{{ btnMessage }}</el-button
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
import { getCategory } from "@/http/api/category";
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
        MENU_CONF: {
          uploadImage: {
            server: env.serverAddress + "/api/upload",
            // form-data fieldName ，默认值 'wangeditor-uploaded-file'
            fieldName: "file",
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ["image/*"],
            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,
            // 自定义增加 http  header
            headers: {
              Authorization: this.$store.state.token,
            },
            // 超时时间，默认为 10 秒
            timeout: 20 * 1000, // 20 秒
            // 小于 xx 就插入 base64 格式（而不上传），默认为 0
            // base64LimitKB: 2 * 1024, // 5kb
            // 自定义插入图片
            customInsert(res, insertFn) {
              let url = res.data.fileUrl;
              let alt = res.data.fieldName;
              let href = res.data.fileUrl;
              // res 即服务端的返回结果
              console.log("服务端返回结果", res);
              // 从 res 中找到 url alt href ，然后插图图片
              insertFn(url, alt, href);
            },
            /*******回调函数********/
            // 上传之前触发
            onBeforeUpload(files) {
              // files 即选中的文件列表
              console.log("上传之前触发", files);
              return files;

              // 返回值可选择：
              // 1. 返回一个数组（files 或者 files 的一部分），则将上传返回结果中的文件
              // 2. 返回 false ，则终止上传
            },
            // 上传进度的回调函数
            onProgress(progress) {
              // progress 是 0-100 的数字
              console.log("progress", progress);
            },
            // 单个文件上传成功之后
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res);
            },
            // 单个文件上传失败
            onFailed(file, res) {
              console.log(`${file.name} 上传失败`, res);
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res);
            },
          },
        },
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
      categoryList: [], // 分类列表
      pageParams: {
        page: 1,
        pageSize: 10,
      },
      inputVisible: false,
      inputValue: "", // 标签输入框的值
      btnMessage: "发布",
      btnIsLoadgin: false,
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
  mounted() {
    this.getCategory(); // 获取分类
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
      this.btnMessage = "发布中";
      this.btnIsLoadgin = true;
      const data = await publishArticle(params);
      if (data.code === "00000") {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        this.btnMessage = "发布";
        this.btnIsLoadgin = false;
        // 发布成功跳转至发布结果页面
        let articleParams = {
          articleId: data.data.article_id,
          articleMenuId: data.data.article_menu_id,
          articleParentMenuId: data.data.article_parent_menu_id,
        };
        this.$router.push({
          name: "publishComplete",
          query: articleParams,
        });
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.btnMessage = "发布";
        this.btnIsLoadgin = false;
      }
    },
    /*********添加分类**********/
    // 选择分类
    chooseCatefory(item) {
      this.form.category = item;
    },
    // 获取分类
    async getCategory() {
      let params = {
        page: this.pageParams.page,
        pageSize: this.pageParams.pageSize,
      };
      const data = await getCategory(params);
      if (data.code === "00000") {
        this.categoryList = data.data.data;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
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
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 编辑创建
    onCreated() {},
    onChange(editor) {
      // this.content = JSON.stringify(editor.children);
      this.htmlContent = editor.getHtml();
      // this.curContent = editor.children;
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
    customPaste(event) {
      console.log("粘贴", event);
      // // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
      // // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent

      // // 同步
      // editor.insertText("xxx");

      // // 异步
      // setTimeout(() => {
      //   editor.insertText("yy");
      // }, 1000);

      // // return false; // 阻止默认的粘贴行为
      return true; // 继续执行默认的粘贴行为
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
      width: 900px;
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
      width: 100%;
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