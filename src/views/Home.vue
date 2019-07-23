<template>
  <div>
    <blog-nav />
    <blog-profile />
    <section class="home">
      <ul class="post-list" v-loading="loading">
        <article-item v-for="(item, index) in list" :item="item" :key="index" />
      </ul>
      <nav class="post-nav">
        <span
          v-show="meta.current_page > 1"
          @click="handlePrev"
          class="prev"
          style="padding-left: 20px;"
          ><i class="el-icon-arrow-left" />prev</span
        >
        <span
          v-show="meta.last_page > meta.current_page"
          @click="handleNext"
          class="next"
          >next<i class="el-icon-arrow-right"
        /></span>
      </nav>
    </section>
    <blog-footer />
  </div>
</template>

<script>
import BlogNav from "@/components/BlogNav";
import BlogProfile from "@/components/BlogProfile";
import BlogFooter from "@/components/BlogFooter";
import ArticleItem from "@/components/ArticleItem";
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("article");
import { Message, Loading } from "element-ui";
import { scrollTo } from "@/utils/scrollTo";

export default {
  name: "Home",
  components: {
    BlogNav,
    BlogProfile,
    BlogFooter,
    ArticleItem
  },
  data() {
    return {
      loading: false
    };
  },
  async beforeRouteEnter(to, from, next) {
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: "拼命加载中呀..."
    });
    const params = to.params;
    try {
      if (JSON.stringify(params) === "{}") {
        await store.dispatch("article/getFrontArticles");
      } else {
        await store.dispatch("article/getArticlesByCategory", {
          category: params.category,
          params: {}
        });
      }
      next(() => {
        loadingInstance.close();
      });
    } catch (error) {
      Message.error(error.response.data.message);
      loadingInstance.close();
    }
  },
  methods: {
    ...mapActions(["getFrontArticles", "getArticlesByCategory"]),
    async handleNext() {
      await this._getArticles(this.meta.current_page + 1);
    },
    async handlePrev() {
      await this._getArticles(this.meta.current_page - 1);
    },
    async _getArticles(page) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let routeParams = this.$route.params;
      let params = {
        page: page
      };
      try {
        if (JSON.stringify(routeParams) === "{}") {
          await this.getFrontArticles(params);
        } else {
          await this.getArticlesByCategory({
            category: routeParams.category,
            params: params
          });
        }
        scrollTo(0, 800);
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.list,
      meta: state => state.meta
    })
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;

  .post-list {
    margin-top: 0;
  }

  .post-nav {
    text-align: center;
    padding-top: 20px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 40px;

    span {
      -webkit-transition: all 0.1s linear;
      -moz-transition: all 0.1s linear;
      -ms-transition: all 0.1s linear;
      -o-transition: all 0.1s linear;
      transition: all 0.1s linear;
      position: relative;

      &:hover {
        cursor: pointer;
        color: #5694f1;
      }
    }

    .prev {
      float: left;

      &:hover {
        left: -4px;
      }
    }

    .next {
      float: right;

      &:hover {
        right: -4px;
      }
    }
  }
}
</style>
