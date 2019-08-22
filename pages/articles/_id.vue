<template>
  <div>
    <section class="post">
      <article>
        <header>
          <h1>{{ article.title }}</h1>
          <h2 class="headline">
            {{ article.created_at }}
          </h2>
          <ul class="category">
            <li v-for="category in article.categories" :key="category.id">
              <nuxt-link
                :to="{
                  name: 'categories-id-articles',
                  params: { id: category.id }
                }"
                >{{ category.title }}</nuxt-link
              >&nbsp;/&nbsp;
            </li>
            <nuxt-link
              :to="{
                name: 'categories-id-articles',
                params: { id: article.category.id }
              }"
              >{{ article.category.title }}</nuxt-link
            >
          </ul>
        </header>
        <markdown-to-html :markdown="article.main" />
      </article>
    </section>
    <client-only>
      <blog-comment />
    </client-only>
  </div>
</template>

<script>
import BlogComment from '@/components/BlogComment'
import MarkdownToHtml from '@/components/MarkdownToHtml'

export default {
  components: {
    BlogComment,
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
    await store.dispatch('article/fetchArticle', `/api/articles/${params.id}`)
  }
}
</script>

<style lang="scss" scoped>
.post {
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
  }
  .category {
    font: normal 12px/1.5em 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: table;
    margin: 0 auto;
    color: #b2b9be;
    padding: 5px 0 40px 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    & > li {
      float: left;
      a {
        color: #333;
        &:hover {
          text-decoration: none;
          color: #5694f1;
        }
      }
    }
  }
}
</style>
