<template>
  <div>
    <div ref="comment" class="comment-wrap">
      <Comment
        v-model="commentList"
        :user="users"
        :before-submit="submit"
        :before-like="like"
        :before-delete="deleteComment"
        :upload-img="uploadImg"
        :props="props"
      />
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import { getCommentList, addComment } from "@/http/api/comment.js";
export default {
  components: {
    Comment,
  },
  data() {
    return {
      commentList: [],
      props: {
        id: "id", // id
        article_id: "article_id", // 文章id
        content: "content", // 内容
        imgSrc: "imgSrc", // 图片地址
        children: "children", // 子评论
        likes: "thumbupCount", // 点赞数
        reply: "reply", // 回复
        createAt: "createAt", // 创建时间
        user: "userInfo", // 用户信息
      },
    };
  },
  computed: {
    users() {
      let users = {};
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        users.name = userInfo.username;
        users.avatar = userInfo.avatar;
        users.author = true;
      } else {
        users.name = "张三";
        users.avatar =
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
        users.author = true;
      }
      return users;
    },
  },
  mounted() {
    this.getCommentList(); // 获取评论列表
  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      let params = {
        article_id: this.$route.query.articleId,
      };
      const data = await getCommentList(params);
      if (data.code === "00000") {
        if (data.data) {
          this.commentList = data.data;
        } else {
          this.commentList = [];
        }
      } else {
        this.$message.error(data.message);
      }
    },
    async submit(newCommetn, parent, add) {
      console.log("newCommetn: ", newCommetn);
      console.log("parent:", parent);
      console.log("add:", add);
      let params = {};
      if (parent) {
        params = {
          article_id: this.$route.query.articleId,
          content: newCommetn.content,
          parentId: parent.id, // 如果是回复才会有parentId
          userInfo: newCommetn.userInfo,
        };
      } else {
        params = {
          article_id: this.$route.query.articleId,
          content: newCommetn.content,
          userInfo: newCommetn.userInfo,
        };
      }

      const data = await addComment(params);
      if (data.code === "00000") {
        this.$message.success("评论成功");
        this.getCommentList(); // 获取评论列表
      } else {
        this.$message.error(data.message);
      }
    },
    async like(comment) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(comment);
        }, 0);
      });

      console.log("likeComment: ", res);
    },
    async uploadImg({ file, callback }) {
      const res = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(reader.error);
        };
      });

      callback(res);
      console.log("uploadImg： ", res);
    },
    async deleteComment(comment, parent) {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ comment, parent });
        }, 300);
      });

      console.log("deleteComment: ", res);
    },

    // 增加评论示例代码
    addData(times) {
      setTimeout(() => {
        this.data = new Array(times)
          .fill([
            {
              id: 1,
              article_id: 12,
              content: "梦芸\n近况如何\n算来已有十月未见你\n甚是思念",
              userInfo: {
                name: "我叫白云",
                avatar: "",
              },
              createAt: "2020.11.24",
              thumbupCount: 1,
              children: [
                {
                  id: 2,
                  content:
                    "此刻我能闻见漫天火药味道\n我随军藏身长江边一暗无天日的地窖底\n埋首台灯下写这些字却不知把心绪给寄向何地",
                  userInfo: {
                    name: "NARUTO",
                    avatar: "",
                  },
                  thumbupCount: 20,
                  createAt: "2020.11.25",
                },
                {
                  id: 3,
                  content: "\n如磐石般坚毅",
                  userInfo: {
                    name: "我叫黑土",
                    avatar: "",
                  },
                  createAt: "2020.11.25",
                  reply: {
                    name: "NARUTO",
                    avatar: "",
                  },
                },
              ],
            },
          ])
          .flat(Infinity);
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.change-role {
  background: #1c2433;
  color: #eee;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-content: center;
  .change {
    cursor: pointer;
    padding: 0.4rem;
    margin-right: 2rem;
    font-size: 0.9rem;
    border: 1px solid #e99210;
    border-radius: 5px;
    user-select: none;
    &:hover {
      opacity: 0.9;
    }
  }
  .current-role {
    min-width: 15rem;
    color: #e99210;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #e99210;
    padding: 0 1rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      border: 1px solid #eee;
      border-radius: 50%;
    }
  }
}

.comment-wrap {
  overflow: auto;
}
</style>
