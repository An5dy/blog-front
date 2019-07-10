<template>
  <div>
    <blog-nav></blog-nav>
    <blog-profile></blog-profile>
    <section class="home">
      <ul class="post-list" v-loading="loading">
        <article-item
          v-for="(item, index) in list"
          :item="item"
          :key="index"
        ></article-item>
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
    <blog-footer></blog-footer>
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
    try {
      await store.dispatch("article/getArticles");
      next(() => {
        loadingInstance.close();
      });
    } catch (e) {
      Message.info(e.response.data.message);
    }
  },
  methods: {
    ...mapActions(["getArticles"]),
    async handleNext() {
      if (this.loading) {
        return;
      }
      let params = {
        page: this.meta.current_page + 1
      };
      this.loading = true;
      try {
        await this.getArticles(params);
        scrollTo(0, 800);
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    },
    async handlePrev() {
      if (this.loading) {
        return;
      }
      let params = {
        page: this.meta.current_page - 1
      };
      this.loading = true;
      try {
        await this.getArticles(params);
        scrollTo(0, 800);
        this.loading = false;
      } catch (err) {
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
