<template>
  <div class="source-dialog">
    <el-dialog
      :title="title"
      :visible.sync="sourceDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
    >
      <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="资源名称" prop="sourceTitle">
          <el-input
            v-model="form.sourceTitle"
            clearable
            placeholder="请输入资源标题"
            :maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="socategoryName">
          <el-tag
            v-for="(item, index) of socategoryList"
            :key="index"
            size="medium"
            :hit="false"
            :class="[
              'category-tag',
              {
                'category-tag-active':
                  form.socategoryName === item.socategory_name,
              },
            ]"
            @click="chooseCatefory(item.socategory_name)"
            >{{ item.socategory_name }}</el-tag
          >
        </el-form-item>
        <el-form-item label="资源简介" prop="sourceAbstract">
          <!-- <el-input
            v-model="form.sourceAbstract"
            clearable
            placeholder="请输入资源简介"
            :rows="6"
            show-word-limit
            type="textarea"
          ></el-input> -->
          <Editor
            class="editor-container"
            :editorId="editorId"
            :defaultConfig="editorConfig"
            :defaultContent="defaultContent"
            :mode="mode"
            @onCreated="onCreated"
            @onChange="onChange"
            @onDestroyed="onDestroyed"
            @onFocus="onFocus"
            @onBlur="onBlur"
            @customAlert="customAlert"
            @customPaste="customPaste"
          />
        </el-form-item>
        <el-form-item label="添加标签">
          <el-tag
            class="tags"
            :key="tag"
            v-for="tag in form.sourceTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <!-- 标签数目超过3个则不允许添加 -->
          <template v-if="form.sourceTags.length < 3">
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
        <el-form-item label="资源封面">
          <el-upload
            class="avatar-uploader"
            :action="uploadAddress()"
            :headers="{ Authorization: $store.state.token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.sourceCover"
              :src="form.sourceCover"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="下载链接"
          v-for="(item, index) in form.sourceDownload"
          :key="index"
        >
          <el-input
            v-model="item.name"
            clearable
            placeholder="请输入资源下载标题"
            :maxlength="100"
            show-word-limit
          ></el-input>
          <el-input
            v-model="item.link"
            clearable
            placeholder="请输入资源下载链接"
            :maxlength="100"
            show-word-limit
          ></el-input>
          <el-input
            v-model="item.pass"
            clearable
            placeholder="请输入提取码"
            :maxlength="100"
            show-word-limit
          ></el-input>
          <span
            class="addDownload"
            @click="addDownload"
            v-if="index === form.sourceDownload.length - 1"
            >添加</span
          >
        </el-form-item>
        <el-form-item label="资源截图">
          <el-upload
            class="Screen-uploader"
            :action="uploadAddress()"
            :headers="{ Authorization: $store.state.token }"
            :on-remove="handleScreenRemove"
            :on-success="handleScreenSuccess"
            :before-upload="beforeScreenUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import env from "@/config/index";
import { addSource, updateSource } from "@/http/api/source";
import { Editor, getEditor, removeEditor } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
export default {
  components: { Editor },
  props: {
    sourceDialogVisible: { type: Boolean, default: false },
    // 弹窗标题
    title: {
      type: String,
      default: "新增",
    },
    // 资源分类
    socategoryList: {
      type: Array,
      default: () => [],
    },
    // 回显信息
    baseInfo: {
      type: Object,
    },
  },
  data() {
    return {
      form: {
        sourceTitle: "", // 资源名称
        socategoryName: "", // 资源分类
        sourceAbstract: "", // 资源简介
        sourceTags: [], // 资源标签
        sourceCover: "", // 资源封面地址
        sourceDownload: [
          {
            name: "",
            link: "",
            pass: "",
          },
        ], // 资源下载链接
        sourceScreen: [], // 资源截图
      },
      inputVisible: false, // 标签输入框
      inputValue: "", // 标签输入框的值
      rules: {
        sourceTitle: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
        ],
        socategoryName: [
          { required: true, message: "请选择资源分类", trigger: "blur" },
        ],
        sourceAbstract: [
          { required: true, message: "请写入资源简介", trigger: "blur" },
        ],
      },
      editorId: "w-e-2",
      toolbarConfig: {
        /* 工具栏配置 */
        excludeKeys: ["fullScreen"], // 需要去除的菜单
      },
      defaultContent: null,
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
      htmlContent: "",
      content: "",
    };
  },
  watch: {
    // 如果有回显信息,则赋值给form
    baseInfo(newVal, oldVal) {
      if (newVal) {
        this.form = this.baseInfo;
      } else {
        console.log(oldVal);
      }
    },
  },
  methods: {
    // 取消弹窗
    closeDialog() {
      this.$emit("closeDialog");
    },
    // 确认弹窗
    confirmDialog(formName) {
      console.log(this.form);
      // 表单校验通过才执行
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.title === "新增资源") {
            this.addSourceAsync();
          } else {
            this.updateSourceAsync();
          }
        } else {
          return false;
        }
      });
      this.$emit("closeDialog");
    },
    // 新增资源
    async addSourceAsync() {
      let params = this.form;
      const data = await addSource(params);
      if (data.code === "00000") {
        this.$message({
          message: "发布成功",
          type: "success",
        });
        this.$emit("confirmCloseDialog");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.$emit("closeDialog");
      }
    },
    // 更新资源
    async updateSourceAsync() {
      let params = this.form;
      const data = await updateSource(params);
      if (data.code === "00000") {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.$emit("confirmCloseDialog");
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
        this.$emit("closeDialog");
      }
    },

    // 选择分类
    chooseCatefory(item) {
      this.form.socategoryName = item;
    },
    /*********添加标签**********/
    handleClose(tag) {
      this.form.sourceTags.splice(this.form.sourceTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.sourceTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 上传封面地址
    uploadAddress() {
      return env.serverAddress + "/api/upload";
    },
    handleAvatarSuccess(res) {
      this.form.sourceCover = res.data.fileUrl;
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
    // 添加下载链接
    addDownload() {
      this.form.sourceDownload.push({
        name: "",
        link: "",
        pass: "",
      });
    },
    // 资源截图上传相关方法
    handleScreenSuccess(response, file, fileList) {
      this.form.sourceScreen = fileList;
    },
    beforeScreenUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
    handleScreenRemove(file, fileList) {
      this.form.sourceScreen = fileList;
    },

    // 编辑创建
    onCreated() {},
    onChange(editor) {
      this.content = JSON.stringify(editor.children);
      this.htmlContent = editor.getHtml();
      this.form.sourceAbstract = this.htmlContent;
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
      console.log(event);
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
.source-dialog {
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .addDownload {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
  .editor-container {
    width: 100%;
    min-height: 200px;
    background-color: #fff;
    ::v-deep .w-e-text-container {
      min-height: 200px;
      border: 1px solid #ccc;
      .w-e-scroll {
        min-height: 200px;
        #w-e-textarea-1 {
          min-height: 200px;
        }
      }
    }
  }
}
</style>
