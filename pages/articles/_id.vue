<template>
  <section class="post">
    <article>
      <header>
        <h1>{{ article.title }}</h1>
        <h2 class="headline">
          {{ article.created_at
          }}<span class="tags"
            ><router-link
              :to="{
                name: 'categories-id-articles',
                params: { id: article.category.id }
              }"
              >{{ article.category.title }}</router-link
            ></span
          >
        </h2>
      </header>
      <markdown-to-html :markdown="article.main" />
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
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.sketch
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.article.tags
        }
      ]
    }
  },
  computed: {
    article() {
      return this.$store.state.article.article
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('article/fetchArticle', params.id)
  }
}
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
    font: 300 32px/1.4em 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  .headline {
    font: normal 13px/1.5em 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: -5px 0 0 0;
    color: #b2b9be;
    font-size: 13px;
    letter-spacing: 1px;
    display: inline-block;
    .tags {
      font: normal 13px/1.5em 'Helvetica Neue', Helvetica, Arial, sans-serif;
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
