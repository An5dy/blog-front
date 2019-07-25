<template>
  <div>
    <blog-nav />
    <blog-profile />
    <section class="post">
      <article>
        <header>
          <h1>{{ article.title }}</h1>
          <h2 class="headline">
            {{ article.created_at
            }}<span class="tags"
              ><router-link
                :to="{
                  name: 'category-articles',
                  params: { category: article.category.id }
                }"
                >{{ article.category.title }}</router-link
              ></span
            >
          </h2>
        </header>
        <markdown-to-html :markdown="article.main" />
      </article>
    </section>
    <blog-comment />
    <blog-footer />
  </div>
</template>

<script>
import BlogNav from "@/components/BlogNav";
import BlogProfile from "@/components/BlogProfile";
import BlogFooter from "@/components/BlogFooter";
import store from "@/store";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("article");
import { Message, Loading } from "element-ui";
import MarkdownToHtml from "@/components/MarkdownToHtml";
import BlogComment from "@/components/BlogComment";

export default {
  name: "ArticleShow",
  components: {
    BlogNav,
    BlogProfile,
    BlogFooter,
    MarkdownToHtml,
    BlogComment
  },
  data() {
    return {
      timer: ""
    };
  },
  async beforeRouteEnter(to, from, next) {
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: "拼命加载中呀..."
    });
    const id = to.params.id;
    try {
      await store.dispatch("article/getFrontArticle", id);
      next(() => {
        loadingInstance.close();
      });
    } catch (error) {
      Message.error(error.response.data.message);
      loadingInstance.close();
    }
  },
  computed: {
    ...mapState({
      article: state => state.article
    })
  },
  mounted() {
    document.title = this.article.title;
  }
};
</script>

<style lang="scss" scoped>
.post {
  max-width: 700px;
  padding: 0 40px 20px 40px;
  margin: auto;

  header {
    text-align: center;
  }

  h1 {
    margin-top: 40px;
    margin-bottom: 20px;
    color: #222;
    font: 300 32px/1.4em "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .headline {
    font: normal 13px/1.5em "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: -5px 0 0 0;
    color: #b2b9be;
    font-size: 13px;
    letter-spacing: 1px;
    display: inline-block;

    .tags {
      font: normal 13px/1.5em "Helvetica Neue", Helvetica, Arial, sans-serif;
      margin: -5px 0 40px 0;
      color: #b2b9be;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 5px;
      display: block;

      a {
        color: #333;
        display: block;

        &:hover {
          text-decoration: none;
          color: #5694f1;
        }
      }
    }
  }
}
</style>
