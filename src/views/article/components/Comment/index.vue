<template>
  <div id="comment" ref="comment">
    <!-- 顶部评论表单 -->
    <comment-form :upload-img="uploadImg" @form-submit="formSubmit">
      <img
        class="avatar"
        :src="user.avatar || ''"
        @error="(e) => e.target.classList.add('error')"
      />
    </comment-form>

    <!-- 底部评论列表 -->
    <comment-list v-if="cacheData.length > 0" ref="comment-list">
      <!-- 单条评论 -->
      <comment-item
        v-for="(comment, i) in cacheData"
        :id="`comment-${i}`"
        :key="`comment-${i}`"
        :ref="`comment-${i}`"
        :user="user"
        :comment="comment"
        @comment-reply="hasForm"
        @comment-like="handleCommentLike"
        @comment-delete="handleCommentDelete"
      >
        <!-- 回复表单 -->
        <template #default="{ id }">
          <comment-form
            v-if="forms.includes(id)"
            :id="id"
            :parent="comment"
            :placeholder="`回复${comment.user.name}...`"
            :upload-img="uploadImg"
            @form-submit="formSubmit"
            @form-delete="deleteForm"
          />
        </template>

        <!-- 单条评论下的回复列表 -->
        <template #subList="{ parentId }">
          <comment-list sub>
            <!-- 单条回复 -->
            <comment-item
              v-for="(child, j) in comment.children"
              :id="`${parentId}-${j}`"
              :key="`${parentId}-${j}`"
              :ref="`${parentId}-${j}`"
              :comment="child"
              :user="user"
              :parent="comment"
              @comment-reply="hasForm"
              @comment-like="handleCommentLike"
              @comment-delete="handleCommentDelete"
            >
              <!-- 单条回复的回复表单 -->
              <comment-form
                v-if="forms.includes(`${parentId}-${j}`)"
                :id="`${parentId}-${j}`"
                :comment="child"
                :parent="comment"
                :placeholder="`回复${child.user && child.user.name}...`"
                :upload-img="uploadImg"
                @form-delete="deleteForm"
                @form-submit="formSubmit"
              />
            </comment-item>
          </comment-list>
        </template>
      </comment-item>
    </comment-list>
  </div>
</template>

<script>
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import CommentItem from "./components/CommentItem";
export default {
  name: "JuejinComment",
  components: { CommentList, CommentItem, CommentForm },
  inheritAttrs: false,
  model: {
    prop: "data",
    event: "input",
  },
  props: {
    /* 数据 */
    data: {
      type: Array,
      default: () => [],
      required: true,
    },
    /* 当前用户 */
    user: {
      type: Object,
      default: () => {},
      required: true,
    },
    /* 配置属性 */
    props: {
      type: Object,
      default: () => {},
    },
    /* 提交表单前事件 */
    beforeSubmit: {
      type: Function,
      required: true,
    },
    /* 执行点赞前事件 */
    beforeLike: {
      type: Function,
      required: true,
    },
    /* 执行删除前事件 */
    beforeDelete: {
      type: Function,
      required: true,
    },
    /* 上传图片 */
    uploadImg: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      forms: [], // 显示在视图上的表单id数组
      cacheData: [],
    };
  },
  computed: {
    computedProps({ props }) {
      if (!props) return null;
      const entries = Object.entries(props);
      return entries.length > 0 ? entries : null;
    },
  },
  created() {
    // 监听并执行一次
    const cancel = this.$watch("data", () => {
      this.processData();
      cancel && cancel();
    });
  },
  methods: {
    // * 处理初始数据
    processData() {
      this.cacheData = this.data.map(this.comparePropsAndValues);
    },
    // * 对比和检查每条评论对象字段值
    comparePropsAndValues(comment) {
      // 初始对象
      const originObj = {
        id: "",
        content: "",
        imgSrc: "",
        children: [],
        likes: 0,
        reply: null,
        createAt: null,
        user: {},
      };

      // 赋值
      for (const key in originObj) {
        originObj[key] =
          comment[this.props[key]] || comment[key] || originObj[key];

        // 校验
        this.validate({ key, value: originObj[key] });
      }

      if (originObj.children.length > 0) {
        originObj.children = originObj.children.map(this.comparePropsAndValues);
      }

      return originObj;
    },
    // * 校验数据
    validate({ key, value }) {
      const map = {
        user: {
          validate: function (v) {
            return (
              (typeof v !== "object" || JSON.stringify(v) === "{}") &&
              this.message
            );
          },
          message: "User must be an object with props.",
        },
        reply: {
          validate: function (v) {
            return typeof v !== "object" && this.message;
          },
          message: "Reply must be an object",
        },
        children: {
          validate: function (v) {
            return !Array.isArray(v) && this.message;
          },
          message: "Children must be an array",
        },
        createAt: {
          validate: function () {
            return (
              new Date(value).toString() === "Invalid Date" && this.message
            );
          },
          message: "CreateAt is not a valid date.",
        },
      };

      const target = map[key];
      if (!target) return;

      const res = target.validate(value);
      if (res) {
        throw new Error(`validate(): ${res}`);
      }
    },
    // * 将更新后的数组中的对象数据转换为初始对象结构
    transformToOriginObj(comment) {
      try {
        const _comment = JSON.parse(
          JSON.stringify(comment, (key, value) => {
            if (key === "_liked") {
              return undefined; // 过滤掉_liked字段
            }

            return value;
          })
        );

        if (_comment.children && _comment.children.length > 0) {
          _comment.children = _comment.children.map(this.transformToOriginObj);
        }

        // 返回props中自定义的字段名
        if (!this.computedProps) return _comment;

        for (const [key, value] of this.computedProps) {
          if (key !== value && Object.hasOwnProperty.call(_comment, key)) {
            _comment[value] = JSON.parse(JSON.stringify(_comment[key]));
            delete _comment[key];
          }
        }

        return _comment;
      } catch (e) {
        console.error(e);
      }
    },
    // * 点击回复按钮，判断是否已存在该id的表单，存在删除该表单，不存在则新增该表单，并触发其他表单blur事件
    hasForm(id) {
      this.forms.includes(id) ? this.deleteForm(id) : this.addForm(id);
      this.broadcastBlur(this.$refs["comment-list"].$children, id);
    },
    // * 增加新表单
    addForm(id) {
      this.forms.push(id);
      // this.scrollIntoView(`${id}-form`)
    },
    // * 删除表单
    deleteForm(id) {
      const index = this.forms.indexOf(id);
      index > -1 && this.forms.splice(index, 1);
    },
    // * 评论或回复
    async formSubmit({
      newComment: { id, callback, ...params },
      parent = null,
    }) {
      const _params = Object.assign(params, { user: this.user });

      // 等待外部提交事件执行
      if (typeof this.beforeSubmit === "function") {
        try {
          const data = this.transformToOriginObj(_params);

          const add = (data) => {
            this.addComment(id, this.comparePropsAndValues(data));
            callback();
          };

          await this.beforeSubmit(data, parent, add);
        } catch (e) {
          console.error(e);
        }
      }
    },
    // * 点赞
    async handleCommentLike({ id, comment: { children, _liked, ...params } }) {
      console.log(_liked);
      console.log(children);
      const _params = Object.assign(params, { user: this.user });
      if (typeof this.beforeLike === "function") {
        try {
          await this.beforeLike(this.transformToOriginObj(_params));

          this.storeLikes(id);
        } catch (e) {
          console.error(e);
        }
      }
    },
    // * 删除评论或回复
    async handleCommentDelete({ id, comment, parent = null }) {
      if (typeof this.beforeDelete === "function") {
        try {
          const data = this.transformToOriginObj(comment);
          await this.beforeDelete(data, parent);

          this.deleteComment(id);
        } catch (e) {
          console.error(e);
        }
      }
    },
    // * 保存点赞
    storeLikes(id) {
      const { commentIndex, replyIndex } = this.getIndex(id);

      let comment = this.cacheData[commentIndex];

      if (!isNaN(replyIndex)) {
        comment = comment.children[replyIndex];
      }

      comment._liked = !comment._liked;

      if (comment.likes) {
        comment._liked ? comment.likes++ : comment.likes--;
      } else {
        comment.likes = 1;
      }

      const data = this.cacheData.map(this.transformToOriginObj);
      this.$emit("input", data);
    },
    // * 存储新评论或回复
    addComment(id, rawData) {
      const { commentIndex } = this.getIndex(id);

      // 更新视图
      if (commentIndex === "root") {
        this.cacheData.push(rawData);
      } else {
        const comment = this.cacheData[commentIndex];
        comment.children.push(rawData);
      }

      // 滚动至可见视图上
      const signal =
        commentIndex === "root"
          ? this.cacheData.length - 1
          : `${commentIndex}-${
              this.cacheData[commentIndex].children.length - 1
            }`;
      this.scrollIntoView(`comment-${signal}`);

      // 更新外部数据
      const data = this.cacheData.map(this.transformToOriginObj);
      this.$emit("input", data);
    },
    // * 删除评论或回复
    deleteComment(id) {
      const { commentIndex, replyIndex } = this.getIndex(id);

      this.cacheData = this.cacheData.filter((c, i) => {
        if (isNaN(replyIndex)) {
          return i !== commentIndex;
        } else {
          c.children = c.children.filter((r, j) => j !== replyIndex);
          return c;
        }
      });

      const data = this.cacheData.map(this.transformToOriginObj);
      this.$emit("input", data);
    },
    // * 向下递归触发表单blur事件
    broadcastBlur(target, id) {
      if (id && target.id === id) return;

      if (Array.isArray(target)) {
        target.map((c) => this.broadcastBlur(c, id));
      } else {
        const children = target.$children;
        children && this.broadcastBlur(children, id);

        const richInput = target.$refs["rich-input"];
        richInput && richInput.blur();
      }
    },
    // * 从id中提取出序号
    getIndex(id) {
      const [, c, r] = id.split("-");
      return { commentIndex: c === "root" ? c : +c, replyIndex: +r };
    },
    // * 使得更新的子组件滚动到视图可见区域
    scrollIntoView(ref) {
      this.$nextTick(() => {
        this.$refs[ref][0].$el.scrollIntoView(false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
#comment {
  margin-top: 20px;
  & > .comment-list {
    background-color: #fff;
  }

  ::v-deep {
    img {
      user-select: none;
      -webkit-user-drag: none;
      &.avatar {
        width: 2.1336rem;
        height: 2.1336rem;
        border-radius: 50%;
        cursor: pointer;
      }
      &.error {
        display: inline-block;
        transform: scale(0.5);
        content: "";
        color: transparent;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #e7e7e7;
          box-sizing: border-box;
          transform: scale(2);
          background: #f5f5f5
            url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M304.128 456.192c48.64 0 88.064-39.424 88.064-88.064s-39.424-88.064-88.064-88.064-88.064 39.424-88.064 88.064 39.424 88.064 88.064 88.064zm0-116.224c15.36 0 28.16 12.288 28.16 28.16s-12.288 28.16-28.16 28.16-28.16-12.288-28.16-28.16 12.288-28.16 28.16-28.16z' fill='%23e6e6e6'/%3E%3Cpath d='M887.296 159.744H136.704C96.768 159.744 64 192 64 232.448v559.104c0 39.936 32.256 72.704 72.704 72.704h198.144L500.224 688.64l-36.352-222.72 162.304-130.56-61.44 143.872 92.672 214.016-105.472 171.008h335.36C927.232 864.256 960 832 960 791.552V232.448c0-39.936-32.256-72.704-72.704-72.704zm-138.752 71.68v.512H857.6c16.384 0 30.208 13.312 30.208 30.208v399.872L673.28 408.064l75.264-176.64zM304.64 792.064H165.888c-16.384 0-30.208-13.312-30.208-30.208v-9.728l138.752-164.352 104.96 124.416-74.752 79.872zm81.92-355.84l37.376 228.864-.512.512-142.848-169.984c-3.072-3.584-9.216-3.584-12.288 0L135.68 652.8V262.144c0-16.384 13.312-30.208 30.208-30.208h474.624L386.56 436.224zm501.248 325.632c0 16.896-13.312 30.208-29.696 30.208H680.96l57.344-93.184-87.552-202.24 7.168-7.68 229.888 272.896z' fill='%23e6e6e6'/%3E%3C/svg%3E")
            no-repeat center / 50% 50%;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  #comment {
    & > .comment-list {
      margin: 0 1.6rem;
    }
    & > .comment-form {
      margin: 1rem 1.6rem;
    }
    & > ::v-deep .comment-root .avatar-box {
      display: none;
    }
  }
}
</style>
