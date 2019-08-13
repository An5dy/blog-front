<template>
  <section class="main">
    <div v-for="(items, index) in archives" :key="index" class="archive">
      <h3>{{ index }}</h3>
      <ul v-for="(item, inde) in items" :key="inde">
        <div class="post-item">
          <div class="post-time">{{ item.created_at }}</div>
          <nuxt-link
            class="post-link"
            :to="{ name: 'articles-id', params: { id: item.id } }"
            >{{ item.title }}</nuxt-link
          >
        </div>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "Andy's Home | 归档",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Andy's Home,个人博客,技术交流,归档,文章归档"
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: "Andy's Home,个人博客,技术交流,归档,文章归档"
        }
      ]
    }
  },
  computed: {
    archives() {
      return this.$store.state.archive.archives
    }
  },
  async asyncData({ store }) {
    await store.dispatch('archive/fetchArchives')
  }
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;
  .archive {
    margin: 0 0 50px 0;
    font-size: 16px;
    h3 {
      font-size: 20px;
      font-weight: 400;
      color: #333;
    }
    .post-item {
      padding: 10px 0;
      overflow-x: hidden;
      white-space: nowrap;
      &:hover {
        color: #5694f1;
        transition: 0.3s ease-out;
        .post-link {
          color: #5694f1;
        }
      }
      .post-time {
        display: inline-block;
        width: 60px;
        margin: 0;
        color: #8a8a8a;
      }
      .post-link {
        color: #8a8a8a;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
