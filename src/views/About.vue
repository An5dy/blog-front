<template>
  <div>
    <blog-nav />
    <blog-profile />
    <section class="about">
      <article>
        <markdown-to-html :markdown="about.main" />
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
const { mapState } = createNamespacedHelpers("about");
import { Message, Loading } from "element-ui";
import MarkdownToHtml from "@/components/MarkdownToHtml";
import BlogComment from "@/components/BlogComment";

export default {
  name: "About",
  components: {
    BlogNav,
    BlogProfile,
    BlogFooter,
    MarkdownToHtml,
    BlogComment
  },
  async beforeRouteEnter(to, from, next) {
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: "拼命加载中呀..."
    });
    try {
      await store.dispatch("about/getFrontAbout");
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
      about: state => state.about
    })
  }
};
</script>

<style lang="scss" scoped>
.about {
  max-width: 700px;
  padding: 0 40px 20px 40px;
  margin: auto;
}
</style>
