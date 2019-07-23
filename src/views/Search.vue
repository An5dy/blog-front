<template>
  <div>
    <blog-nav />
    <blog-profile />
    <section class="search">
      <el-autocomplete
        class="search-input"
        v-model="search"
        :fetch-suggestions="handleSearch"
        @select="handleSelect"
      >
        <el-button slot="append" icon="el-icon-search" />
      </el-autocomplete>
      <div class="tips">tips：支持全文搜索。</div>
    </section>
    <blog-footer />
  </div>
</template>

<script>
import BlogNav from "@/components/BlogNav";
import BlogProfile from "@/components/BlogProfile";
import BlogFooter from "@/components/BlogFooter";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("search");

export default {
  name: "Search",
  components: {
    BlogNav,
    BlogProfile,
    BlogFooter
  },
  data() {
    return {
      search: "",
      loading: false,
      query: ""
    };
  },
  methods: {
    ...mapActions(["searchArticles"]),
    async handleSearch(query, callback) {
      if (query == "" || this.loading) return callback([]);
      if (this.loading || this.query == query) return callback(this.list);
      this.loading = true;
      this.query = query;
      try {
        await this.searchArticles({ query: query });
        callback(this.list);
        this.loading = false;
      } catch (error) {
        this.$message.error(error.response.data.message);
        this.loading = false;
      }
    },
    handleSelect(item) {
      this.$router.push({ name: "article-show", params: { id: item.id } });
    }
  },
  computed: {
    ...mapState({
      list: state => state.data
    })
  }
};
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
