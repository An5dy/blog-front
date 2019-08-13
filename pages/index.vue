<template>
  <section class="home">
    <ul class="post-list">
      <blog-item v-for="(item, index) in list" :key="index" :item="item" />
    </ul>
    <nav class="post-nav">
      <span v-show="meta.current_page > 1" class="prev" @click="handlePrev"
        ><i class="el-icon-arrow-left" />prev</span
      >
      <span
        v-show="meta.last_page > meta.current_page"
        class="next"
        @click="handleNext"
        >next<i class="el-icon-arrow-right"
      /></span>
    </nav>
  </section>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import BlogItem from '@/components/BlogItem.vue'

export default {
  components: {
    BlogItem
  },
  head() {
    return {
      title: "Andy's Home | 首页",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Andy's Home,个人博客,技术交流"
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: "Andy's Home,个人博客,技术交流"
        }
      ]
    }
  },
  computed: {
    list() {
      return this.$store.state.article.list
    },
    meta() {
      return this.$store.state.article.meta
    }
  },
  async asyncData({ store }) {
    await store.dispatch('article/fetchArticles', {
      path: '/api/articles'
    })
  },
  methods: {
    async handleNext() {
      await this._getArticles(1)
    },
    async handlePrev() {
      await this._getArticles(-1)
    },
    async _getArticles(page) {
      await this.$store.dispatch('article/fetchArticles', {
        path: '/api/articles',
        params: {
          page: this.meta.current_page + page
        }
      })
      scrollTo(0, 800)
    }
  }
}
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
    font-size: 15px;
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
      padding-left: 20px;
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
