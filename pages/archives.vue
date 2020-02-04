<template>
  <section class="main">
    <el-timeline>
      <el-timeline-item
        v-for="(items, index) in archives"
        :key="index"
        :timestamp="index"
        icon="el-icon-sunny"
        type="primary"
        placement="top"
        size="large"
      >
        <el-card
          v-for="(item, inde) in items"
          :key="inde"
          style="margin-top: 10px;"
          class="post-item"
          shadow="hover"
        >
          <h4>
            <nuxt-link
              class="post-link"
              :to="{ name: 'articles-id', params: { id: item.id } }"
              >{{ item.title }}</nuxt-link
            >
          </h4>
          <p>{{ item.created_at }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
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
  max-width: 500px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;
  .post-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    a:hover {
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
</style>
