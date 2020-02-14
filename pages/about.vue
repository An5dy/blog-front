<template>
  <section class="post">
    <article>
      <markdown-to-html :markdown="about.main" />
    </article>
  </section>
</template>

<script>
import MarkdownToHtml from '@/components/MarkdownToHtml'

export default {
  components: {
    MarkdownToHtml
  },
  head() {
    return {
      title: "Andy's Home | 关于",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Andy's Home,个人博客,技术交流,关于"
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: "Andy's Home,个人博客,技术交流,关于"
        }
      ]
    }
  },
  computed: {
    about() {
      return this.$store.state.about.about
    }
  },
  async asyncData({ store }) {
    await store.dispatch('about/fetchAbout')
  }
}
</script>

<style lang="scss" scoped>
.post {
  background-color: #ffffff;
  border-radius: 4px;
  padding-top: 20px;
}
</style>
