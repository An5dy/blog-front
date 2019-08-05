<template>
  <section class="about">
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
.about {
  max-width: 700px;
  padding: 0 40px 20px 40px;
  margin: auto;
}
</style>
