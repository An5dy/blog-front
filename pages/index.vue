<template>
  <section class="home">
    <ul class="post-list">
      <blog-item v-for="(item, index) in list" :key="index" :item="item" />
    </ul>
  </section>
</template>

<script>
import BlogItem from '@/components/BlogItem.vue'

export default {
  components: {
    BlogItem
  },
  computed: {
    list() {
      return this.$store.state.article.list
    }
  },
  async fetch({ store }) {
    await store.dispatch('article/fetchArticles')
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
