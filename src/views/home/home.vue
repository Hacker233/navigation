<template>
  <div class="home">
    <!-- <home-card :websitList="websitList"></home-card> -->
    <div class="home-content">
      <!-- 搜索标题 -->
      <div class="search-title"></div>
      <!-- 搜索盒子 -->
      <div class="search-box">
        <!-- 搜素列表 -->
        <div class="search-box-list">
          <ul>
            <li
              :class="[{ 'search-active': currentIndex === index }]"
              v-for="(item, index) of searchWebsiteList"
              :key="index"
              @click="selectSearch(item, index)"
            >
              <img :src="item.website_favicon" alt="" />
              {{ item.website_title }}
            </li>
          </ul>
        </div>
        <!-- 搜索输入框 -->
        <div class="search-input-box">
          <el-form :action="actionUrl" target="_blank">
            <el-form-item>
              <el-input
                placeholder="请输入内容"
                v-model="formItem.searchValue"
                size="large"
                :name="inputName"
              >
                <template slot="prepend">
                  <img style="width: 30px" :src="searchIcon" alt="" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 搜索引擎简介 -->
        <div class="search-abstract">
          <p class="abstract-content">{{ abstractContent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryMenuWebsite } from "@/http/api/website";
export default {
  data() {
    return {
      websitList: [], // 所有网站列表
      searchWebsiteList: [], // 搜索引擎列表
      searchIcon: "", // 搜索框前面的图标
      actionUrl: "", // 表单提交地址
      inputName: "",
      abstractContent: "",
      currentIndex: 0,
      formItem: {
        searchValue: "", // 搜索框中的值
      },
    };
  },
  components: {},
  mounted() {
    this.queryMenuWebsite();
  },
  methods: {
    // 选择搜索引擎
    selectSearch(item, index) {
      this.currentIndex = index;
      this.searchIcon = item.website_favicon;
      this.actionUrl = item.website_link;
      this.inputName = item.website_tags;
      this.abstractContent = item.website_abstract;
    },
    // 获取所有站点
    async queryMenuWebsite() {
      let params = {
        menuId: this.$route.query.menuId || 11,
      };
      const data = await queryMenuWebsite(params);
      if (data.code === "00000") {
        this.websitList = data.data;
        let temp = [];
        this.websitList.forEach((item) => {
          temp = temp.concat(item.list);
        });
        this.searchWebsiteList = temp;
        this.searchIcon = this.searchWebsiteList[0].website_favicon;
        this.actionUrl = this.searchWebsiteList[0].website_link;
        this.inputName = this.searchWebsiteList[0].website_tags;
        this.abstractContent = this.searchWebsiteList[0].website_abstract;
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    // // 跳转新的标签页
    // toLink(url) {
    //   window.open(url);
    // },
  },
};
</script>
<style lang="scss" scoped>
.home {
  padding-top: 40px;
  .home-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .card-content-box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .card-box {
        width: 30%;
        margin-bottom: 30px;
        .title {
          width: 100%;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 0 0 10px;
          font-size: 14px;
          font-weight: 400;
          color: #b7b7b7;
          .iconfont {
            margin-right: 10px;
          }
        }
        .card-list {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          grid-row-gap: 10px;
          grid-column-gap: 15px;
          justify-content: space-between;
          .card {
            min-width: 120px;
            max-width: 120px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            font-size: 14px;
            color: #6b7184;
            padding: 0 5px;
            cursor: pointer;

            transition: all 0.3s;
            &:hover {
              background: #6b7184;
              color: #fff;
            }
            p {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    .search-box {
      width: 100%;
      margin-top: 100px;
      .search-box-list {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        ul {
          width: 60%;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          grid-row-gap: 10px;
          padding: 0;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 6px 14px;
            border-radius: 5px;
            cursor: pointer;
            list-style: none;
            transition: all 0.3s;
            font-size: 14px;
            border-bottom: 1px solid #eee;
            margin: 0 5px;
            height: 35px;
            &:hover {
              background-color: #6b7184;
              color: #fff;
            }
            img {
              width: 30px;
              margin-right: 10px;
              border-radius: 5px;
            }
          }
          .search-active {
            background-color: #6b7184;
            color: #fff;
          }
        }
      }
      .search-input-box {
        height: 120px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        ::v-deep .el-input__inner {
          height: 60px;
        }
        ::v-deep .el-form {
          width: 100%;
        }
      }
      .search-abstract {
        width: 60%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 2px;
          color: #a0a0a0;
        }
      }
    }
  }
}
</style>