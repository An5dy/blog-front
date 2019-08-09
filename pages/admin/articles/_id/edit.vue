<template>
  <el-form>
    <el-form-item label="标题">
      <el-input v-model="article.title" size="small" style="width: 450px" />
    </el-form-item>
    <el-form-item label="分类">
      <el-select
        v-model="article.category.id"
        size="small"
        placeholder="请选择分类"
      >
        <el-option
          v-for="category in categories"
          :key="category.id"
          :label="category.title"
          :value="category.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="正文">
      <markdown-edit ref="md" :main.sync="article.main"></markdown-edit>
    </el-form-item>
    <el-form-item>
      <el-button
        style="float:right;"
        size="medium"
        type="primary"
        @click="handleEdit"
        >确认发布
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import MarkdownEdit from '@/components/MarkdownEdit'

export default {
  layout: 'admin',
  components: {
    MarkdownEdit
  },
  computed: {
    categories() {
      return this.$store.state.category.list
    },
    article() {
      return this.$store.state.article.article
    }
  },
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch(
        'article/fetchArticle',
        `/api/admin/articles/${params.id}`
      ),
      store.dispatch('category/fetchCategories')
    ])
  },
  methods: {
    async handleEdit() {
      try {
        await this.$store.dispatch('article/handleUpdate', this.article)
        this.$router.push('/admin/articles')
      } catch (error) {}
    }
  }
}
</script>
