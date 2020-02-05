<template>
  <section class="search">
    <el-autocomplete
      v-model="search"
      :fetch-suggestions="handleSearch"
      @select="handleSelect"
      class="search-input"
      size="medium"
      placeholder="请输入要搜索的内容..."
    >
      <el-button slot="append" icon="el-icon-search" />
    </el-autocomplete>
    <div class="tips">tips：支持全文搜索。</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      query: ''
    }
  },
  head() {
    return {
      title: "Andy's Home | 搜索",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Andy's Home,个人博客,技术交流,搜索"
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: "Andy's Home,个人博客,技术交流,搜索,全文搜索"
        }
      ]
    }
  },
  computed: {
    list() {
      return this.$store.state.search.data
    }
  },
  methods: {
    async handleSearch(query, callback) {
      if (query === '') {
        const data = []
        return callback(data)
      }
      if (this.query === query) return callback(this.list)
      this.query = query
      await this.$store.dispatch('search/searchArticles', {
        query: this.query
      })
      callback(this.list)
    },
    handleSelect(item) {
      this.$router.push({ name: 'articles-id', params: { id: item.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 40px 20px 40px;
  .search-input {
    width: 100%;
  }
  .tips {
    color: #8a8a8a;
    text-align: center;
    font-size: 14px;
    padding: 10px 0px;
  }
}
</style>
